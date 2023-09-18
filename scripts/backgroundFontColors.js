//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////// CHANGE BACKGROUND AND FONT COLOR OF CURRENT PAGE //////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// DEFINE CURRENT URL //
var currentURL = window.location.href;

// DEFINE QUERYSELECTORALL VARIABLES //
var pageBody = document.querySelectorAll("#default-body");
var pageH1 = document.querySelectorAll("#header-title");
var blogItem = document.querySelectorAll("#blog-item");
var projectsPageItem = document.querySelectorAll("#projectpage-item");
var projectPost = document.querySelectorAll("#projects-post");
var footerSocialLink = document.querySelectorAll("#footer-social-link");
var footerCopyright = document.querySelectorAll("#footer-copyright");
var otherpageLink = document.querySelectorAll("#otherpage-link");
var anchor = document.querySelectorAll("#text-link");
var headerNavbar = document.querySelectorAll("#header-navbar");
var headerNavContainer = document.querySelectorAll("#header-nav-container");
var headerNavLink = document.querySelectorAll("#header-nav-link");
var headerSiteurl = document.querySelectorAll("#header-siteurl");

// DEFINE PAGE COLORS //

// PROJECTS //
var projectsBackgroundColor = "background-color: rgba(255, 230, 230, 255)";
var projectsFontColor = "color: rgba(156, 44, 45, 255)";
var projectsHeaderNavbarBackgroundColor = "background-color: rgba(255, 150, 150, 255)";

// ABOUT //
var aboutBackgroundColor = "background-color: rgba(220, 255, 230, 255)";
var aboutFontColor = "color: rgba(13, 130, 63, 255)";
var aboutHeaderNavbarBackgroundColor = "background-color: rgba(150, 255, 170, 255)";

// BLOG //
var blogBackgroundColor = "background-color: rgba(235, 224, 255, 255)";
var blogFontColor = "color: rgba(69, 39, 117, 255)";
var blogHeaderNavbarBackgroundColor = "background-color: rgba(220, 150, 255, 255)";

//////////////////////////////////////////////////////////////////////////////////////////////

if (currentURL.includes("projects")) {

  // PROJECTS PAGE //

  headerNavbar.forEach((headerNavbar) => {
    headerNavbar.style.cssText = `${projectsHeaderNavbarBackgroundColor}; ${projectsFontColor}`;
  });

  headerNavContainer.forEach((headerNavContainer) => {
    headerNavContainer.style.cssText = `${projectsHeaderNavbarBackgroundColor}; ${projectsFontColor}`;
  });

  headerNavLink.forEach((headerNavLink) => {
    headerNavLink.style.cssText = `${projectsHeaderNavbarBackgroundColor}; ${projectsFontColor}`;
  });

  headerSiteurl.forEach((headerSiteurl) => {
    headerSiteurl.style.cssText = `${projectsHeaderNavbarBackgroundColor}; ${projectsFontColor}`;
  });

  pageBody.forEach((pageBody) => {
    pageBody.style.cssText = `${projectsBackgroundColor}; ${projectsFontColor}`;
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

  headerNavbar.forEach((headerNavbar) => {
    headerNavbar.style.cssText = `${aboutHeaderNavbarBackgroundColor}; ${aboutFontColor}`;
  });

  headerNavContainer.forEach((headerNavContainer) => {
    headerNavContainer.style.cssText = `${aboutHeaderNavbarBackgroundColor}; ${aboutFontColor}`;
  });

  headerNavLink.forEach((headerNavLink) => {
    headerNavLink.style.cssText = `${aboutHeaderNavbarBackgroundColor}; ${aboutFontColor}`;
  });

  headerSiteurl.forEach((headerSiteurl) => {
    headerSiteurl.style.cssText = `${aboutHeaderNavbarBackgroundColor}; ${aboutFontColor}`;
  });
  
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

  // BLOG PAGE // 

  headerNavbar.forEach((headerNavbar) => {
    headerNavbar.style.cssText = `${blogHeaderNavbarBackgroundColor}; ${blogFontColor}`;
  });

  headerNavContainer.forEach((headerNavContainer) => {
    headerNavContainer.style.cssText = `${blogHeaderNavbarBackgroundColor}; ${blogFontColor}`;
  });

  headerNavLink.forEach((headerNavLink) => {
    headerNavLink.style.cssText = `${blogHeaderNavbarBackgroundColor}; ${blogFontColor}`;
  });

  headerSiteurl.forEach((headerSiteurl) => {
    headerSiteurl.style.cssText = `${blogHeaderNavbarBackgroundColor}; ${blogFontColor}`;
  });

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

} 