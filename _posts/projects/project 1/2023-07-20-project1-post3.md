---
layout: post
title: >
    #3 Preparing our data: Data Cleaning
category: project 1
permalink: /projects/project1/:year/:month/:day/:title
date: 24/07/2023
---

Hello! In the <a id="otherpage-link" href="{{site.baseurl}}/projects/project1/2023/07/15/project1-post2">last post</a>, we collected our data from <a id="text-link" href="https://fbref.com/en/">fbref.com</a> in R and now have a list of tables that correspond to the different categories of player stats that can be found on <a id="text-link" href="https://fbref.com/en/">fbref</a>. However, despite having the raw data, the current format and structure of the data is not appropriate for use in analysis in R - we need to clean the data. 

Let's get started!

Now, as mentioned, we left off in the last post by creating an object called "tables". This object is a list of all the tables we collected from <a id="text-link" href="https://fbref.com/en/">fbref</a>. In football, goalkeepers have a unique role on the pitch and this uniqueness is reflected by the various metrics used to measure goalkeepers. We currently have two tables in our "tables" list that are exclusively for goalkeepers. Since goalkeepers are a subset of all football players, these tables have less rows than the other more general stats tables. As such, we're going to start by taking these goalkeeper-exclusive tables out of the "tables" list and putting them inside a new list - "gk_tables".

<div id="code-snippet-container">
{% highlight r %}
 
    gk_tables <- tables[c(2,3)]    
    tables <- tables[-c(2,3)]      
 
{% endhighlight %}
<p id="code-snippet-caption"> Fig 1: Separating GK tables into new list </p>
</div>

Now we have two lists. It is important to note that at this stage, there are still goalkeeper rows within tables in the "tables" list, we just separated the tables that exclusively contain goalkeepers and no other positions. Later on, we will make sure all the goalkeeper rows are separated from the outfield player data. 

Next, let's start by renaming the columns in our two table lists. Firstly, our "stats" table in our "tables" list contains many columns that represent to "per 90" statistics. Just to explain quickly, "per 90" stats are any statistic which has been divided by the total number of minutes played and then multiplied by 90 in order to provide a "per 90 minute" standardisation of any given statistic. This is a very common and important way to enable comparisons between different players, teams or divisions as player/teams/divisions do not always play the exact same number of minutes. Let's say a player A and player B both scored 10 goals, but player A played 1800 minutes whilst player B played only 900 minutes. Whilst they scored the same number of goals, player B did it in half the amount of time, averaging at 1 goal per 90 minutes. As such, it is not really fair to judge these two players as similarly prolific goalscorers, rather player B is twice as prolific as player A (at least based on the current evidence). This idea applies beyond just goals and really to any metric you want. 

Now back to cleaning the data. Let's start by renaming all the columns in the "stats" table in the "tables" list that refer to "per 90" statistics. Currently, these columns are prefaced by "per 90 minutes", but in my opinion it is better to name "per 90" variables by using a suffix as to enable clarity and ease of reading.

<div id="code-snippet-container">
    {% highlight r %}
    
    tables[["stats"]] <- tables[["stats"]] %>%    
    rename_with(
        ~paste(
        sub("\\.[0-9]+", "", .), 
        " per 90", 
        sep = ""
        ),
        .cols = 28:length(.)
    )
    {% endhighlight %}
    <p id="code-snippet-caption"> Fig 2: Renaming "per 90" columns in the "stats" table </p>
</div>

Next, we're going to go table by table and rename columns, according to my personal preference and for clarity. Since there are 11 different tables across the two lists, with each table having multiple columns to be renamed, I will not show the code here, but you can access the script on GitHub where you will be able to see all the code I used. To summarise, I simply call each table individually and use the *rename()* function to manually edit names to my preference.

With the renaming done, let's now address the goalkeeper situation. I said earlier that there are still goalkeepers in the "tables" list, and I would prefer them to be moved to the "gk_tables" list. 

<div id="code-snippet-container">
    {% highlight r %}
    
    # empty list for goalkeeper tables
    gk_tables_1 <- list() 

    # loop through each table in "tables"
    for (i in seq_along(tables)) {
    
        # grab rows where Pos == "GK", save to "table"
        table <- tables[[i]][tables[[i]]$Pos == "GK", ]
        
        # add "table" to the "gk_tables_1" list
        gk_tables_1[[names(tables)[i]]] <- table
        
        # remove rows where Pos == "GK" from original table
        tables[[i]] <- tables[[i]][tables[[i]]$Pos != "GK", ]    
        
        # delete temp objects
        rm(table, i)
    
    }
    {% endhighlight %}
    <p id="code-snippet-caption"> Fig 2: Renaming "per 90" columns in the "stats" table </p>
</div>

Similar to the for loop used in the last post, I created another list object - gk_tables_1 - to store all the goalkeeper rows still in the "tables" list, and then removed those rows from the tables once they had been copied over. We could have simply added them to the "gk_tables" object, but there is currently an issue we need to address before we can do that.

In our "tables" list, there is a table called "playingtime". This table actually contains more players than any of the other tables, and as such has more rows than the other tables. The row numbers are equal for all the other tables and they all refer to the same set of players, but the "playingtime" table is different as it simply includes any player who has been named in a teamsheet throughout the entire season. The other tables instead only include players who actually recorded some data (i.e. they played), as opposed to those who did not (from here, refered to as "unused subs"). The presence of these unused subs creates an issue later on when we merge all the tables together, so for now we're putting the goalkeepers from the "tables" list inside a separate list.

So now let's address this issue by parsing out all the players from the "playingtime" table who are unused subs

<div id="code-snippet-container">
    {% highlight r %}
    
    # combine rows found in "playingtime" but not in "stats", compared by "Player", 
    # and rows in "playingtime" where minutes played is NA, blank or 0.
    unused_subs <- unique(bind_rows(
        anti_join(tables[["playingtime"]], tables[["stats"]], by = "Player"),
        filter(tables[["playingtime"]], is.na(Min) | Min == "" | Min == 0)
        ))

    # remove unused subs from "playingtime" table
    tables[["playingtime"]] <- anti_join(
        tables[["playingtime"]], unused_subs, by = "90s")

    # repeat prior two steps for goalkeepers
    unused_subs_gk <- unique(bind_rows(
        anti_join(gk_tables_1[["playingtime"]], gk_tables_1[["stats"]], by = "Player"),    
        filter(gk_tables_1[["playingtime"]], is.na(Min) | Min == "" | Min == 0)
        ))

    gk_tables_1[["playingtime"]] <- anti_join(
        gk_tables_1[["playingtime"]], unused_subs_gk, by = "Min")    

    {% endhighlight %}
    <p id="code-snippet-caption"> Fig 3: Parsing out unused subs </p>
</div>

The first objects - unused_subs - contains all the outfield unused substitutes. unique() wraps around the bind_rows() function to ensure no duplicate rows. bind_rows() takes two arguments that correspond to rows in a given data frame and connects them together. Those arguments are the anti_join() function and the filter() function. The anti_join function compares all rows in the "stats" table against the rows in the "playingtime" table and returns all the rows in the "playingtime" table that are not found in the "stats" table. The argument by = "Player" tells the anti_join() function which column it should use to make the comparison between the two data frames, as such it is comparing the two tables based on their values in the "Player" column.

So we now have all the outfield unused subs in a data frame - unused_subs - but we need to now remove the unused subs from the "playingtime" table. The next line of code also makes use of the anti_join() function to only return rows from the "playingtime" function that are not found in the new unused_subs object. This has the effect of removing all the unused subs from the "playingtime" table. 

This process is then repeated for all goalkeeper unused subs, resulting in the unused_subs_gk object. These unused subs objects may not be used in this present project, as these players have no playing data to analyse, but they may be needed in the future and so that is why I have chosen to keep them as separate tables.

We can now combine our goalkeeper tables - gk_tables and gk_tables_1 - and remove gk_tables_1.

<div id="code-snippet-container">
    {% highlight r %}
    
    # combine gk_tables and gk_tables_1
    gk_tables <- append(gk_tables, gk_tables_1)    

    # remove gk_tables_1
    rm(gk_tables_1)
    {% endhighlight %}
    <p id="code-snippet-caption"> Fig 4: Combine gk tables </p>
</div>

We're approaching the final stages of data cleaning. Let's now make our final data frame objects to contain all out outfield and goalkeeper data, respectively. We start by simply adding the first table from each list to its respective finalised table.

<div id="code-snippet-container">
    {% highlight r %}
    
    # define first table from each list as the start point
    final_table_outfield <- tables[["stats"]]
    final_table_gks <- gk_tables[["keepers"]]

    {% endhighlight %}
    <p id="code-snippet-caption"> Fig 5: Creating out final tables </p>
</div>

The following for loop runs through each table in the "tables" list and combines it with the final_table_outfield object.

<div id="code-snippet-container">
    {% highlight r %}
    
    # compare subsequent tables in the list to the current table, add columns not 
    # found in current table to it and iterate for whole list (for "tables")
    for (i in 2:length(tables)) {
        
        new_cols <- setdiff(colnames(tables[[i]]), colnames(final_table_outfield))    
        
        final_table_outfield <- cbind(final_table_outfield, tables[[i]][new_cols])
        
        rm(new_cols, i)
    
    }
    {% endhighlight %}
    <p id="code-snippet-caption"> Fig 6: Combining out lists into single tables. </p>
</div>

Importantly, when a new table is combined, only novel rows are added to the final_table_object. Similarly to anti_join, we start by using setdiff() to return column (not rows as with anti_join) that are present in the argument colnames(tables[[i]]) - the column names of the object currently being looped through - but not present in the column names of the final_table_outfield object. This has the effect of only selecting column from the table being looped through that we do not already have in our final_table_outfield object. We then use cbind() to combine the columns from our final_table_outfield object with the table being looped though, but only selecting the columns in that looped though table not currently present in final_table_outfield. rm() then removes the temporary new_cols object, and the next table in the list is looped though. The result is one table - final_table_outfield - that contains all the columns from all the tables in our "tables" list, without containing any duplicate columns that may have been found between the tables in the "tables" list. This same process is used with the gk_tables, producing a table called final_table_gks.

After this, we make some slight modifications to the format of the "Min" column in both final tables, removing commas from the column values, and then set all the numerical columns to have a data class of numeric (except for age and born, for now).

<div id="code-snippet-container">
    {% highlight r %}
    
    # need to remove commas from Min column
    final_table_outfield$Min <- gsub(",", "", final_table_outfield$Min)
    final_table_gks$Min <- gsub(",", "", final_table_gks$Min)

    # convert numeric columns to numeric (except age and born, for now)    
    final_table_outfield[ , 9:ncol(final_table_outfield)] <- sapply(
        final_table_outfield[ , 9:ncol(final_table_outfield)],
        as.numeric
    )

    final_table_gks[ , 9:ncol(final_table_gks)] <- sapply(
        final_table_gks[ , 9:ncol(final_table_gks)],
        as.numeric
    )
    {% endhighlight %}
    <p id="code-snippet-caption"> Fig 7: Fixing column data classes. </p>
</div>

We're not quite ready to be finished with cleaning the data. A reasonable assumption at present might be that our two final tables now have a series of rows which each correspond to a unique player. Unfortunately, this is not the case. Some players transferred to different teams in the middle of the season, and fbref reflects this be creating a new row for that player to separate their stats by each club the player has played for. This might be useful if we want to compare a player's performance between their current and former club(s), but for this present project we do not want to do this and so it would be easier to combine these rows so that each row does in fact correspond to a unique player. I apply the following process to all four tables we have - final_table_outfield, final_table_gks, unused_subs & unused_subs_gk - but will just show the process once for concision. There are also a couple of formatting adjustments made too.

<div id="code-snippet-container">
    {% highlight r %}
    
    # remove two-letter abbreviations from Nation and Comp columns
    final_table_outfield$Nation <- str_remove(final_table_outfield$Nation, "^\\w+\\s")
    final_table_outfield$Comp <- str_remove(final_table_outfield$Comp, "^\\w+\\s")

    # group by Player, Age and Nation and combine rows together
    final_table_outfield <- final_table_outfield %>%
        group_by(Player, Age, Nation) %>%
        summarise(
          # separate characters with commas
          across(where(is.character), ~paste(., collapse = ", ")),
          # simply add numeric values together
          across(where(is.numeric), sum)
        ) 

    # Players cannot play more than 38 games in a season in the top 5 European divisions
    final_table_outfield <- final_table_outfield %>% 
        filter(MP <= 38)

    # remove duplicated character values after combining
    final_table_outfield$Nation <- str_remove(final_table_outfield$Nation, "^[^,]+,\\s*")    
    final_table_outfield$Pos <- str_remove(final_table_outfield$Pos, "^[^,]+,\\s*")
    final_table_outfield$Age <- str_remove(final_table_outfield$Age, "^[^,]+,\\s*")
    final_table_outfield$Born <- str_remove(final_table_outfield$Born, "^[^,]+,\\s*")

    # remove duplicated character values but retain non-duplicated ones 
    final_table_outfield$Comp <- sapply(final_table_outfield$Comp, function(x) {
      parts <- strsplit(x, ", ")[[1]]
      if (length(parts) > 1 && parts[1] == parts[2]) {
        parts[1]
      } else {
        x
      }
    })

    # reorder selected columns
    final_table_outfield <- final_table_outfield %>% relocate(id, Player, Pos, Nation, Squad, Comp, Age)

    # make NAs 0
    final_table_outfield[is.na(final_table_outfield)] <- 0

    # convert age and born to numeric class
    final_table_outfield[ , 7:ncol(final_table_outfield)] <- sapply(
      final_table_outfield[ , 7:ncol(final_table_outfield)], 
      as.numeric
    )
    {% endhighlight %}
    <p id="code-snippet-caption"> Fig 8: Combining rows so that each row is a unique player. </p>
</div>

This relatively larger code snippet starts by looking at the values in the "Nation" and "Comp" columns. The values in these columns initially have two-letter abbreviations as a prefix. I personally do not want these to be present and so the first two lines remove these. After this, we group by Player, Age and Nation, variables which are consistent for each unique player and so do not change when the player moves to a new team (at long as we are looking at a single point in time, i.e. now). You might assume we could just group by the player's name, but some players actually have the same names, despite being different players, and so grouping by age and nationality as well avoids grouping together rows that do not actually refer to the same player. Unless two players share the exact same name, age and nationality, they will not be merged accidentally. As far as I can tell, given the data we have, this is the best way to group players, but note that it is not perfect.

Next, any rows where the number of matches played is greater than 38 are removed. This is because, in Europe's top 5 divisions, no division has more than 38 league games in a season. After this, we combine all the character class columns and separate their values by using commas (e.g. Liverpool and Arsenal becomes: Liverpool, Arsenal) and we add together the values from the numeric class columns. This gives us one row corresponding to a unique player, accumulating their data across all the clubs they may have played for in that season. After this, some of our character class columns have produced duplications in their values (e.g. England, England) and so I remove the first term and the comma from the values in these columns. 

Next, we are doing something similar as before but with the Comp column. If a player transfers from one team to another team within the same division, the Comp value for that player will have a duplication (e.g. Premier League, Premier League). However, if the player moves from one team to another team in a different division, their Comp value will record both competitions that player has played in (e.g. Premier League, La Liga). We want to keep the format of the latter but we want to avoid duplicating when the player moves clubs within the same division. That is what the next function achieves. It first splits the value into its two components either side of the comma. Next, the if function checks to see if the length of the "parts" object is greater than one (i.e. checks that there are indeed two) and checks to see if the two parts are equal. If there is more than one part and they are equal to each other, the function replaces what would be the duplicated value (Premier League, Premier League) with just the first part (Premier League). However, if the two parts are not equal, the function just leaves them as they are. 

The last part of this code snippet first reorders some of the columns and then converts the age and born columns to numeric class. We initially needed them to be characters to avoid our code from combining someone's age if they had more than one columns. If a player was 26 years old but had two columns initially, if we converted the age column to numeric before running this code, we would get an age of 52 which would be incorrect.

We have now finished cleaning the data. We now have four data frames, two of which we will be using for this project. As I have touched on, whilst this data could be used in other projects, we did also perform some cleaning procedures that prevent us from analysing the data in certain ways (e.g. comparings a player's performance across the different clubs they played for). This isn't a huge issue as we can always grab the data from <a id="text-link" href="https://fbref.com/en/">fbref</a> again and clean it differently. Nonetheless, this concludes our preparation of the data.

Another issue worth noting is that, due to limitations with the data set, when we combined our rows towards the end we grouped by player name (Player), their age (Age) and their nationality. Unfortunately, there are no other variables that could be used to match rows referring to the same player. From what I was able to tell, this has resulted in the removal of around 2-4 players from the data set who otherwise would have been valid player rows, as they have identical names, ages and nationalities. Whilst, this is a very small proportion of the overall data set, it is not ideal and worth considering when interpreting analyses. 

In the <a id="otherpage-link" href="{{site.baseurl}}/projects/project1/2023/08/05/project1-post4">next post</a>, I want to begin with some data wrangling to convert our (many) different metrics into percentiles so that we may begin to create our percentile radars. If you enjoyed reading this post or have any suggestions or thoughts, do let me know. Thank you for following along!