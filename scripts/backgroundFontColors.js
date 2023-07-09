//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////// CHANGE BACKGROUND AND FONT COLOR OF CURRENT PAGE //////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// DEFINE CURRENT URL //
var currentURL = window.location.href;

// DEFINE QUERYSELECTORALL VARIABLES //
var pageBody = document.querySelectorAll("#default-body");
var pageSiteurl = document.querySelectorAll("#header-siteurl");
var pageNavlink = document.querySelectorAll("#header-nav-link");
var pageH1 = document.querySelectorAll("#header-title");
var blogItem = document.querySelectorAll("#blog-item");
var projectsPageItem = document.querySelectorAll("#projectpage-item");
var projectPost = document.querySelectorAll("#projects-post");
var footerSocialLink = document.querySelectorAll("#footer-social-link");
var footerCopyright = document.querySelectorAll("#footer-copyright");
var aboutContentLink = document.querySelectorAll("#about-content-link");

// DEFINE PAGE COLORS //

// PROJECTS //
var projectsBackgroundColor = "background-color: rgba(156, 44, 45, 255)";
var projectsFontColor = "color: rgba(255, 192, 192, 255)";

// ABOUT //
var aboutBackgroundColor = "background-color: rgba(13, 130, 63, 255)";
var aboutFontColor = "color: rgba(162, 255, 200, 255)";

// BLOG //
var blogBackgroundColor = "background-color: rgba(69, 39, 117, 255)";
var blogFontColor = "color: rgba(214, 192, 255, 255)";

//////////////////////////////////////////////////////////////////////////////////////////////

if (currentURL.includes("projects")) {

  // PROJECTS PAGE //

  pageBody.forEach((pageBody) => {
    pageBody.style.cssText = `${projectsBackgroundColor}; ${projectsFontColor}`;
  });

  pageSiteurl.forEach((pageSiteurl) => {
    pageSiteurl.style.cssText = `${projectsBackgroundColor}; ${projectsFontColor}`;
  });

  pageNavlink.forEach((pageNavlink) => {
    pageNavlink.style.cssText = `${projectsBackgroundColor}; ${projectsFontColor}`;
  });

  pageH1.forEach((pageH1) => {
    pageH1.style.cssText = `${projectsBackgroundColor}; ${projectsFontColor}`;
  });

  projectsPageItem.forEach((projectsPageItem) => {
    projectsPageItem.style.cssText = `${projectsBackgroundColor}; ${projectsFontColor}`;
  });

  projectPost.forEach((projectPost) => {
    projectPost.style.cssText = `${projectsBackgroundColor}; ${projectsFontColor}`;
  });

  footerSocialLink.forEach((footerSocialLink) => {
    footerSocialLink.style.cssText = `${projectsBackgroundColor}; ${projectsFontColor}`;
  });

  footerCopyright.forEach((footerCopyright) => {
    footerCopyright.style.cssText = `${projectsBackgroundColor}; ${projectsFontColor}`;
  });

} else if (currentURL.includes("about")) {

  // ABOUT PAGE //  

  pageBody.forEach((pageBody) => {
    pageBody.style.cssText = `${aboutBackgroundColor}; ${aboutFontColor}`;
  });

  pageSiteurl.forEach((pageSiteurl) => {
    pageSiteurl.style.cssText = `${aboutBackgroundColor}; ${aboutFontColor}`;
  });

  pageNavlink.forEach((pageNavlink) => {
    pageNavlink.style.cssText = `${aboutBackgroundColor}; ${aboutFontColor}`;
  });

  pageH1.forEach((pageH1) => {
    pageH1.style.cssText = `${aboutBackgroundColor}; ${aboutFontColor}`;
  });

  footerSocialLink.forEach((footerSocialLink) => {
    footerSocialLink.style.cssText = `${aboutBackgroundColor}; ${aboutFontColor}`;
  });

  footerCopyright.forEach((footerCopyright) => {
    footerCopyright.style.cssText = `${aboutBackgroundColor}; ${aboutFontColor}`;
  });

  aboutContentLink.forEach((aboutContentLink) => {
    aboutContentLink.style.cssText = `${aboutBackgroundColor}; ${aboutFontColor}`;
  });

} else if (currentURL.includes("blog")) {

  pageBody.forEach((pageBody) => {
    pageBody.style.cssText = `${blogBackgroundColor}; ${blogFontColor}`;
  });

  pageSiteurl.forEach((pageSiteurl) => {
    pageSiteurl.style.cssText = `${blogBackgroundColor}; ${blogFontColor}`;
  });

  pageNavlink.forEach((pageNavlink) => {
    pageNavlink.style.cssText = `${blogBackgroundColor}; ${blogFontColor}`;
  });

  pageH1.forEach((pageH1) => {
    pageH1.style.cssText = `${blogBackgroundColor}; ${blogFontColor}`;
  });

  blogItem.forEach((blogItem) => {
    blogItem.style.cssText = `${blogBackgroundColor}; ${blogFontColor}`;
  });

  footerSocialLink.forEach((footerSocialLink) => {
    footerSocialLink.style.cssText = `${blogBackgroundColor}; ${blogFontColor}`;
  });

  footerCopyright.forEach((footerCopyright) => {
    footerCopyright.style.cssText = `${blogBackgroundColor}; ${blogFontColor}`;
  });

}