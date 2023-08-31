---
layout: post
title: >
    #2 Getting our data: Web scraping
category: project 1
permalink: /projects/project1/:year/:month/:day/:title
date: 15/07/2023
---

Hello! With the <a id="otherpage-link" href="{{site.baseurl}}/projects/project1/2023/07/14/project1-post1">overview</a> of this project done, let's get started. Now, with any analysis project a good place to start is with simply getting the data we're going to be using. Our source is <a id="text-link" href="https://fbref.com/en/">fbref.com</a>, a reliable and powerful source of football data that covers a wide range of competitions across club and national levels for both men's and women's football. For anyone interested in analysing football in any way, I highly recommend this source.

As for our project, I'm going to be using R to do the analyses, visualise the data and to eventually build an app to make our *percentile radars* interactive. The first step is going to simply be to get the data. Now we could just manually download the data (as .csv files, for example), but if we want the most up-to-date data, which we do in this project, we should read from the website in real-time to speed up the process. 

To start, we need to load some R packages in our R code script to allow us to use the tools we need to scrape and manipulate our data. The loaded packages are:
 - <a id="text-link" href="https://www.tidyverse.org/packages/" target="_blank">Tidyverse</a>: A collection of packages that provide tools for manipulating data frames. We need this to restructure our data so that it can be used in analysis.
 - <a id="text-link" href="https://rvest.tidyverse.org/" target="_blank">rvest</a>: This package provides tools for web scraping. Whilst part of the Tidyverse collection, rvest needs to be loaded separately. 

<div id="code-snippet-container">
  {% highlight r %}
  
    ##### load packages #####

    if (!require(tidyverse)) {
      install.packages("tidyverse", dependencies = TRUE); require(tidyverse)    
    }

    if (!require(rvest)) {
      install.packages("rvest", dependencies = TRUE); require(rvest)
    }
  {% endhighlight %}
  <p id="code-snippet-caption"> Fig 1: Loading R packages </p>
</div>

With these packages installed and loaded into our R project, we can begin scraping our data. Let's walk through the process of doing this.

<div id="code-snippet-container">
  {% highlight r %}
  
  # read main webpage html
  urls <- read_html(
    "https://fbref.com/en/comps/Big5/Big-5-European-Leagues-Stats"    
    ) %>% 
    # select all anchor nodes
    html_nodes("a") %>% 
    # grab the href attributes from those anchor nodes
    html_attr("href") %>%  
    # filter to urls we want, save as object
    str_subset(., "players/Big-5") %>% 
    # remove duplicates by using unique()
    unique() %>% 
    paste0("https://fbref.com", .)
  {% endhighlight %}
  <p id="code-snippet-caption"> Fig 2: Grabbing the URLs </p>
</div>

Here, we've made an object in our R project called "urls". This is where we will store the urls we want to grab our data from. This code snippet is using tools from the <a id="text-link" href="https://rvest.tidyverse.org/" target="_blank">rvest</a> package. Now for some html terminology. We first begin reading the html code - read_html() - from a webpage that contains hyperlinks to all the data we want to use. Next, we identify where these hyperlinks are stored in the html code of the webpage by selecting all of the anchor ("a") elements - html_nodes(). Now we have all of the parts of the webpage where hyperlinks can be found, we next need to actually get these hyperlinks. We use the html_attr() function to read all of the "href" attributes in these anchor elements - these attributes contain the raw urls for each anchor element. 

Now we have all of the urls on the webpage we are reading from. We now need to filter out all the hyperlinks we don't want and only keep those that we are going to use. The sub_subset() function looks through all of the urls we've just collected and returns just those urls that contain the string "players/Big-5". By manually reading the urls of the data tables we're going to use, we can see that they all contain this string and that this string is unique to the tables we are going to use. This therefore serves to filter out all the junk urls, leaving us with the locations of all the data frames we want. The next step involves the unique() function. Since links to our data frames appear more than once on the webpage, we want to avoid duplicating our data. Unique() ensures that any duplicates in our url list are removed. We now have the urls we want, but they are missing parts. We need to complete the urls so that they actually work when we go to scrape data from them. In this scenario, the urls are missing the first bit of the url, the baseurl of the website. Paste() takes this baseurl and adds it to the beginning of all of the incomplete urls in our list.

We now have all the urls we need. We can now begin collecting our data from the website.

<div id="code-snippet-container">
  {% highlight r %}
  
  # make an empty list for the tables to go in
  tables <- list()

  # loop through urls to extract tables
  for (url in urls) {
    
    # each url contains a name that indicates what the table represents
    # extract the name from the url
    name <- url %>% str_extract_all("[^/]+") %>% flatten_chr() %>% nth(6)    
    
    # save each html table as "table"
    tables[[name]] <- read_html(url) %>%
      html_nodes("table") %>%
      html_table() %>% 
      lapply(as.data.frame)
    
    # print console message to show progress
    print(paste0("New table saved: ", name))
    
    # delete the temporary objects used in the function
    rm(url, name)
    
  }
  {% endhighlight %}
  <p id="code-snippet-caption"> Fig 3: Scraping our data </p>
</div>

First, we store an empty list - list() - inside an object called "tables". This "tables" object is where all the data frames we are going to scrape from fbref will be stored.

The for loop uses the "urls" object we created earlier. For each url in our "urls" object, we peform the following process, one-by-one, until all the urls have been looped through:
 - Create a temporary object called "name". Store inside this object the 6th subdirectory of the url. This is unique for each table in our "urls" list and serves as a name for the table.
 - Take our empty "tables" list and nest the name inside it. Then under this name in our list we add the data:
     - Read the html code from the url - read_html()
     - Select all the "table" html elements - html_nodes()
     - Parse those elements out as tables - html_table()
     - Take that table and ensure it is converted into a data frame so that R can recognise it as a table - lapply(as.data.frame)
 - The print() function just prints a message each time we pass through the for loop, telling us which table as been added to the "tables" list.
 - Lastly, the temporary objects - "url" and "name" - are removed.

That's this first step completed. We have now scraped the data we want from fbref. This code should also be future-proof assuming the structure of urls on the website do not change and data hyperlinks are not removed from the webpage. I personally think these are sound (enough) assumptions to make, but it is worth recognising that this process is not future-proof with certainty and so care should be taken to make sure this process works as intended.

In the <a id="otherpage-link" href="{{site.baseurl}}/projects/project1/2023/07/24/project1-post3">next post</a>, we'll take this raw data from fbref and clean it so that it will be ready to use in future stages of the project. If you enjoyed or have any constructive feedback, do let me know. Thank you for reading! 