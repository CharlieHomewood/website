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
var otherpageLink = document.querySelectorAll("#otherpage-link");
var anchor = document.querySelectorAll("#text-link");
var resourcesLink = document.querySelectorAll("#resources-link");

// DEFINE PAGE COLORS //

// PROJECTS //
var projectsBackgroundColor = "background-color: rgba(255, 199, 199, 255)";
var projectsFontColor = "color: rgba(156, 44, 45, 255)";

// ABOUT //
var aboutBackgroundColor = "background-color: rgba(199, 255, 222, 255)";
var aboutFontColor = "color: rgba(13, 130, 63, 255)";

// BLOG //
var blogBackgroundColor = "background-color: rgba(220, 199, 255, 255)";
var blogFontColor = "color: rgba(69, 39, 117, 255)";

// Resources //
var resourcesBackgroundColor = "background-color: rgba(199, 228, 255, 255)";
var resourcesFontColor = "color: rgba(39, 79, 117, 255)";

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

  otherpageLink.forEach((otherpageLink) => {
    otherpageLink.style.cssText = `${projectsBackgroundColor}; ${projectsFontColor}`;
  });

  anchor.forEach((anchor) => {
    anchor.style.cssText = `${projectsBackgroundColor}; ${projectsFontColor}`;
    anchor.target = "_blank";
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

  otherpageLink.forEach((otherpageLink) => {
    otherpageLink.style.cssText = `${aboutBackgroundColor}; ${aboutFontColor}`;
  });

  anchor.forEach((anchor) => {
    anchor.style.cssText = `${aboutBackgroundColor}; ${aboutFontColor}`;
    anchor.target = "_blank";
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

  otherpageLink.forEach((otherpageLink) => {
    otherpageLink.style.cssText = `${blogBackgroundColor}; ${blogFontColor}`;
  });

  anchor.forEach((anchor) => {
    anchor.style.cssText = `${blogBackgroundColor}; ${blogFontColor}`;
    anchor.target = "_blank";
  });

} else if (currentURL.includes("resources")) {

  pageBody.forEach((pageBody) => {
    pageBody.style.cssText = `${resourcesBackgroundColor}; ${resourcesFontColor}`;
  });

  pageSiteurl.forEach((pageSiteurl) => {
    pageSiteurl.style.cssText = `${resourcesBackgroundColor}; ${resourcesFontColor}`;
  });

  pageNavlink.forEach((pageNavlink) => {
    pageNavlink.style.cssText = `${resourcesBackgroundColor}; ${resourcesFontColor}`;
  });

  pageH1.forEach((pageH1) => {
    pageH1.style.cssText = `${resourcesBackgroundColor}; ${resourcesFontColor}`;
  });

  blogItem.forEach((blogItem) => {
    blogItem.style.cssText = `${resourcesBackgroundColor}; ${resourcesFontColor}`;
  });

  footerSocialLink.forEach((footerSocialLink) => {
    footerSocialLink.style.cssText = `${resourcesBackgroundColor}; ${resourcesFontColor}`;
  });

  footerCopyright.forEach((footerCopyright) => {
    footerCopyright.style.cssText = `${resourcesBackgroundColor}; ${resourcesFontColor}`;
  });

  otherpageLink.forEach((otherpageLink) => {
    otherpageLink.style.cssText = `${resourcesBackgroundColor}; ${resourcesFontColor}`;
  });

  anchor.forEach((anchor) => {
    anchor.style.cssText = `${resourcesBackgroundColor}; ${resourcesFontColor}`;
    anchor.target = "_blank";
  });

  resourcesLink.forEach((resourcesLink) => {
    resourcesLink.style.cssText = `${resourcesBackgroundColor}; ${resourcesFontColor}`;
  });

}