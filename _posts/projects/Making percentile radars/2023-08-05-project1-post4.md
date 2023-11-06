---
layout: post
title: >
    #4 Building our data: Percentiles
category: project 1
permalink: /projects/project1/:year/:month/:day/:title
date: 05/08/2023
---

Hello again! <a id="otherpage-link" href="{{site.baseurl}}/projects/project1/2023/07/24/project1-post3">Last time</a>, we went over how we took the data we scraped from <a id="text-link" href="https://fbref.com/en/">fbref</a> and cleaned it so that it would be ready for analysis. That is not entirely true. Whilst percentiles for certain stats are available on fbref via their scout reports, produced using <a id="text-link" href="https://www.statsperform.com/opta/">Opta</a> data, I wanted to both: produce the percentiles myself, and produce percentiles for any stat I want to use. So to preface this post, this does mean that there are some discrepancies between the percentile data I've calculated and the data you can find on fbref. From what I can tell, this is due to a couple of reasons: Opta have more player position categories than those available from fbref, and so when calculating percentiles, different samples are used between my calculations and those of Opta; and percentiles on fbref are calculated using the last 365 days of data, whereas I'm using the number of minutes each player played as shown on the Big 5 player data tables. 

Whilst I don't believe this will be a massive issue, it may mean conclusions that we draw from the data being used in this project may be different from those made via Opta's data. Being explicit about these discrepancies is very important and hopefully informs you going forward.

Now, let's move on with creating percentiles!

<div id="code-snippet-container">
{% highlight r %}
 
    if (!require(tidyverse)) {
        install.packages("tidyverse", dependencies = TRUE); require(tidyverse)    
    }  
 
{% endhighlight %}
<p id="code-snippet-caption"> Fig 1: Load packages </p>
</div>

Since this section of the project is being conducted using a new R script, we have to load our packages again. This time however, we only need the *tidyverse*

<div id="code-snippet-container">
{% highlight r %}
 
    final_table_outfield <- final_table_outfield %>%    
        filter(Min >= 450)

    final_table_gks <- final_table_gks %>% 
        filter(Min >= 450)  
    
{% endhighlight %}
<p id="code-snippet-caption"> Fig 2: Filter out those who played less than 450 mins </p>
</div>

We start by filtering our those players who played less than 450 minutes. This is a fairly standard exclusion criteria used in football data analysis, 450 mins equates to 5 full matches. Whilst this is actually arbitrary, players who played less than 450 minutes and are outliers in their level of performance could end up being compared with players who are also outliers in their performance level, but were so over the course of an entire season (e.g. +3000 mins), which is not entirely fair to representative of actual ability. For example, two players may have a Goals per 90 stat of 1.0. However, if one of these players only played one game (90 mins) and the other played 30 games, the former player simply scored one goals in one game - not massively out of the norm - but the other scored 30 goals in 30 games - an extremely high level of performance. To avoid comparisons like this, the convention is to exclude players who have "not played enough minutes", where the amount of minutes as the threshold is around 5-10 games.

<div id="code-snippet-container">
{% highlight r %}
 
    final_table_outfield_per90 <- final_table_outfield %>% 
        select(-id, -Born, -MP, -Starts) %>%    
        mutate(Min_calc = Min) %>% 
        relocate(Min_calc) %>% 
        mutate(Min = as.character(Min)) %>% 
        mutate(across(where(is.numeric) & !contains(c("%", "90")), ~(. / Min_calc) * 90)) %>% 
        select(-Min_calc) %>% 
        mutate(Min = as.numeric(Min))

    final_table_gks_per90 <- final_table_gks %>% 
        select(-id, -Born, -MP, -Starts) %>% 
        mutate(Min_calc = Min) %>% 
        relocate(Min_calc) %>% 
        mutate(Min = as.character(Min)) %>% 
        mutate(across(where(is.numeric) & !contains(c("%", "90")), ~(. / Min_calc) * 90)) %>% 
        select(-Min_calc) %>% 
        mutate(Min = as.numeric(Min)) 
    
{% endhighlight %}
<p id="code-snippet-caption"> Fig 3: Create per 90 stats </p>
</div>

Now we have excluded players who played less than 450 minutes, we can now convert all our variables into per 90 stats, in order to control for the number of minutes played (discussed in a previous post). 

Before we calculate our percentiles, we should really compare players against those who play in the same (or at least similar) position. For example, what we would consider a "good" level of Goals per 90 for a striker is going to be higher than what we would consider "good" for a defender. If we did not split by position before calculating percentiles, defenders who are exceptional goalscorers would go missing as they would be compared to strikers and attacking players who are going to score more simply because of their position on the pitch. So let's start by splitting our data by position.

<div id="code-snippet-container">
{% highlight r %}
 
    table_DF <- final_table_outfield_per90 %>% 
        filter(grepl("DF", Pos)) 

    table_DF <- table_DF %>%
        rename_with(~paste0(., "_per90")) %>% 
        rename_at(
            .vars = vars(1:7),
            .funs = funs(gsub("_per90", "", .))    
            )

    table_MF <- final_table_outfield_per90 %>% 
        filter(grepl("MF", Pos)) %>% 
        rename_with(~paste0(., "_per90"))

    table_MF <- table_MF %>%
        rename_with(~paste0(., "_per90")) %>% 
        rename_at(
            .vars = vars(1:7),
            .funs = funs(gsub("_per90", "", .))
            )

    table_FW <- final_table_outfield_per90 %>% 
        filter(grepl("FW", Pos)) %>% 
        rename_with(~paste0(., "_per90"))

    table_FW <- table_FW %>%
        rename_with(~paste0(., "_per90")) %>% 
        rename_at(
            .vars = vars(1:7),
            .funs = funs(gsub("_per90", "", .))
            )
    
{% endhighlight %}
<p id="code-snippet-caption"> Fig 4: Split data by position category </p>
</div>

Next, let's calculate our percentiles for each position category. First we'll create some data frames to place the percentile data in

<div id="code-snippet-container">
{% highlight r %}
 
    percentiles_DF <- data.frame(
    matrix(
        NA, 
        nrow = nrow(
        table_DF %>% 
            filter(grepl("DF", Pos))    
        )
      )
    )

    percentiles_MF <- data.frame(
    matrix(
        NA, 
        nrow = nrow(
        table_MF %>% 
            filter(grepl("MF", Pos))
        )
      )
    )

    percentiles_FW <- data.frame(
    matrix(
        NA, 
        nrow = nrow(
        table_FW %>% 
            filter(grepl("FW", Pos))
        )
      )
    )

    percentiles_gks <- data.frame(
    matrix(
        NA, 
        nrow = nrow(
        final_table_gks_per90
        )
      )
    )
    
{% endhighlight %}
<p id="code-snippet-caption"> Fig 5: Create percentile data frames </p>
</div>

Laslty, we're going to loop through each of these data frames, split by position category, and calculate percentiles for each column (where calculation was possible). Then, these calculations are combined with the per 90 data we calculated near to the start. 

<div id="code-snippet-container">
{% highlight r %}
 
    for (col in colnames(table_DF)) {
  
        if (is.numeric(table_DF[[col]])) {

            x <- ecdf(table_DF[[col]])(table_DF[[col]])
            
            x <- round(x * 100, 0)
            
            percentiles_DF[[col]] <- x
            
            rm(col, x)
            
        }
        
    }

    percentiles_DF <- percentiles_DF[ ,-1]

    percentiles_DF <- percentiles_DF %>% 
        rename_with(~paste0(., "_percentile"))

    final_table_DF <- cbind(table_DF, percentiles_DF)

    final_table_DF[, 6:ncol(final_table_DF)] <- lapply(
        final_table_DF[, 6:ncol(final_table_DF)], as.numeric
        )

    for (col in colnames(table_MF)) {
    
        if (is.numeric(table_MF[[col]])) {
            
            x <- ecdf(table_MF[[col]])(table_MF[[col]])
            
            x <- round(x * 100, 0)
            
            percentiles_MF[[col]] <- x
            
            rm(col, x)
            
        }
    
    }

    percentiles_MF <- percentiles_MF[ ,-1]

    percentiles_MF <- percentiles_MF %>% 
        rename_with(~paste0(., "_percentile"))

    final_table_MF <- cbind(table_MF, percentiles_MF)

    final_table_MF[, 6:ncol(final_table_MF)] <- lapply(
        final_table_MF[, 6:ncol(final_table_MF)], as.numeric
        )

    for (col in colnames(table_FW)) {
    
        if (is.numeric(table_FW[[col]])) {
            
            x <- percent_rank(rank(table_FW[[col]]) / length(table_FW[[col]]))
            
            x <- round(x * 100, 0)
            
            percentiles_FW[[col]] <- x
            
            rm(col, x)
            
        }
    
    }

    percentiles_FW <- percentiles_FW[ ,-1]

    percentiles_FW <- percentiles_FW %>% 
        rename_with(~paste0(., "_percentile"))

    final_table_FW <- cbind(table_FW, percentiles_FW)

    final_table_FW[, 6:ncol(final_table_FW)] <- lapply(
        final_table_FW[, 6:ncol(final_table_FW)], as.numeric
        )

    for (col in colnames(final_table_gks_per90)) {
    
        if (is.numeric(final_table_gks_per90[[col]])) {
            
            x <- ecdf(final_table_gks_per90[[col]])(final_table_gks_per90[[col]])    
            
            x <- round(x * 100, 0)
            
            percentiles_gks[[col]] <- x
            
            rm(col, x)
            
        }
    
    }

    percentiles_gks <- percentiles_gks[ ,-1]

    percentiles_gks <- percentiles_gks %>% 
        rename_with(~paste0(., "_percentile"))

    final_table_GK <- cbind(final_table_gks_per90, percentiles_gks)

    final_table_GK[, 6:ncol(final_table_GK)] <- lapply(
        final_table_GK[, 6:ncol(final_table_GK)], as.numeric
        )
    
{% endhighlight %}
<p id="code-snippet-caption"> Fig 5: Create percentile data frames </p>
</div>

And that's it! We now have the data we need to start creating our plots. I'm not sure, at this stage, how in-depth I'm going to go with the data visualisation, but I want to make use of an R package called "Shiny" to create an interactive app which will serve as a dashboard. I want to make this dashboard fairly user friendly, whilst also being able to be a powerful tool to enable users to gain quick, easy-to-understand insights into the Men's Big 5 football competitions. So next time, I'll start brainstorming ideas for how I want to create percentiles radars in more detail.  