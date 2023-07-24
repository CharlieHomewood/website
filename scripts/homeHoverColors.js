var homeNavA = document.querySelectorAll("#home-nav-a");
var homeBody = document.querySelectorAll("#home-body");
var homeH1Link = document.querySelectorAll("#home-h1-link");

var transition = "transition-duration: 1.5s";

homeNavA.forEach(function(homeNavA) {

  var text = homeNavA.textContent;

  homeNavA.addEventListener("mouseover", function() {
    if (text === "Projects") {

      homeNavA.style.cssText = `${projectsFontColor}; ${transition}`;

      homeBody.forEach((homeBody) => {
        homeBody.style.cssText = `${projectsBackgroundColor}; ${transition}`;
      });

      homeH1Link.forEach((homeH1Link) => {
        homeH1Link.style.cssText = `${projectsFontColor}; ${transition}`;
      });

      footerSocialLink.forEach((footerSocialLink) => {
        footerSocialLink.style.cssText = `${projectsFontColor}; ${transition}`;
      });

      footerCopyright.forEach((footerCopyright) => {
        footerCopyright.style.cssText = `${projectsFontColor}; ${transition}`;
      });

    } else if (text === "About") {
      
      homeNavA.style.cssText = `${aboutFontColor}; ${transition}`;

      homeBody.forEach((homeBody) => {
        homeBody.style.cssText = `${aboutBackgroundColor}; ${transition}`;
      });

      homeH1Link.forEach((homeH1Link) => {
        homeH1Link.style.cssText = `${aboutFontColor}; ${transition}`;
      });

      footerSocialLink.forEach((footerSocialLink) => {
        footerSocialLink.style.cssText = `${aboutFontColor}; ${transition}`;
      });

      footerCopyright.forEach((footerCopyright) => {
        footerCopyright.style.cssText = `${aboutFontColor}; ${transition}`;
      });

    }

    else if (text === "Blog") {
      
      homeNavA.style.cssText = `${blogFontColor}; ${transition}`;

      homeBody.forEach((homeBody) => {
        homeBody.style.cssText = `${blogBackgroundColor}; ${transition}`;
      });

      homeH1Link.forEach((homeH1Link) => {
        homeH1Link.style.cssText = `${blogFontColor}; ${transition}`;
      });

      footerSocialLink.forEach((footerSocialLink) => {
        footerSocialLink.style.cssText = `${blogFontColor}; ${transition}`;
      });

      footerCopyright.forEach((footerCopyright) => {
        footerCopyright.style.cssText = `${blogFontColor}; ${transition}`;
      });

    }

    else if (text === "Resources") {
      
      homeNavA.style.cssText = `${resourcesFontColor}; ${transition}`;

      homeBody.forEach((homeBody) => {
        homeBody.style.cssText = `${resourcesBackgroundColor}; ${transition}`;
      });

      homeH1Link.forEach((homeH1Link) => {
        homeH1Link.style.cssText = `${resourcesFontColor}; ${transition}`;
      });

      footerSocialLink.forEach((footerSocialLink) => {
        footerSocialLink.style.cssText = `${resourcesFontColor}; ${transition}`;
      });

      footerCopyright.forEach((footerCopyright) => {
        footerCopyright.style.cssText = `${resourcesFontColor}; ${transition}`;
      });

    }

  });

  homeNavA.addEventListener("mouseout", function() {

    homeNavA.style.color = "";

    homeBody.forEach((homeBody) => {
      homeBody.style.backgroundColor = "";
    });

    homeH1Link.forEach((homeH1Link) => {
      homeH1Link.style.color = "";
    });

    footerSocialLink.forEach((footerSocialLink) => {
      footerSocialLink.style.color = "";
      footerSocialLink.style.transitionDuration = "";
      footerSocialLink.style.cssText = `${"transition: 0.4s ease"}`;
    });

    footerCopyright.forEach((footerCopyright) => {
      footerCopyright.style.color = "";
    });
  
  });

});

