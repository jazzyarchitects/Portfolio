/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
  skel.breakpoints({
    xlarge: '(max-width: 1680px)',
    large: '(max-width: 1280px)',
    medium: '(max-width: 980px)',
    small: '(max-width: 736px)',
    xsmall: '(max-width: 480px)',
    xxsmall: '(max-width: 360px)',
  });

  $(function() {
    var $window = $(window),
      $body = $('body'),
      $main = $('#main');

    // Disable animations/transitions until the page has loaded.
    $body.addClass('is-loading');

    $window.on('load', function() {
      loadGithubData();
      var showProjects = document.getElementById('toggle-projects');
      if (showProjects) {
        showProjects.onchange = function(e) {
          toggleProjects(e.target.checked);
        };
      }
      window.setTimeout(function() {
        $body.removeClass('is-loading');
      }, 100);
    });

    // Fix: Placeholder polyfill.
    $('form').placeholder();

    // Prioritize "important" elements on medium.
    skel.on('+medium -medium', function() {
      $.prioritize(
        '.important\\28 medium\\29',
        skel.breakpoint('medium').active,
      );
    });

    // Nav.
    var $nav = $('#nav');

    if ($nav.length > 0) {
      // Shrink effect.
      $main.scrollex({
        mode: 'top',
        enter: function() {
          $nav.addClass('alt');
        },
        leave: function() {
          $nav.removeClass('alt');
        },
      });

      // Links.
      var $nav_a = $nav.find('a');

      $nav_a
        .scrolly({
          speed: 1000,
          offset: function() {
            return $nav.height();
          },
        })
        .on('click', function() {
          var $this = $(this);

          // External link? Bail.
          if ($this.attr('href').charAt(0) != '#') return;

          // Deactivate all links.
          $nav_a.removeClass('active').removeClass('active-locked');

          // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
          $this.addClass('active').addClass('active-locked');
        })
        .each(function() {
          var $this = $(this),
            id = $this.attr('href'),
            $section = $(id);

          // No section for this link? Bail.
          if ($section.length < 1) return;

          // Scrollex.
          $section.scrollex({
            mode: 'middle',
            initialize: function() {
              // Deactivate section.
              if (skel.canUse('transition')) $section.addClass('inactive');
            },
            enter: function() {
              // Activate section.
              $section.removeClass('inactive');

              // No locked links? Deactivate all links and activate this section's one.
              if ($nav_a.filter('.active-locked').length == 0) {
                $nav_a.removeClass('active');
                $this.addClass('active');
              } else if ($this.hasClass('active-locked'))
                // Otherwise, if this section's link is the one that's locked, unlock it.
                $this.removeClass('active-locked');
            },
          });
        });
    }

    // Scrolly.
    $('.scrolly').scrolly({
      speed: 1000,
    });
  });
})(jQuery);

window.includeHTML = function(cb) {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName('*');
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute('data-include-html');
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          elmnt.innerHTML = this.responseText;
          elmnt.removeAttribute('data-include-html');
          window.includeHTML(cb);
        }
      };
      xhttp.open('GET', file, true);
      xhttp.send();
      return;
    }
  }
  if (cb) cb();
};

window.includeHTML();

var ignoredRepos = [
  'https://github.com/code-lucidal58/Haptiq',
  'https://github.com/jazzyarchitects/Haptiq-Extension',
  'https://github.com/jazzyarchitects/Haptiq-Server',
  'https://github.com/jazzyarchitects/FoodKart-App',
  'https://github.com/code-lucidal58/foodkartServer',
  'https://github.com/jazzyarchitects/fasttext-node',
  'https://github.com/jazzyarchitects/java-inspired-node-logger',
  'https://github.com/jazzyarchitects/electron-music-player',
  'https://github.com/jazzyarchitects/hacktoberfest',
  'https://github.com/jazzyarchitects/awesome-first-timers',
  'https://github.com/jazzyarchitects/first-contributions',
  'https://github.com/jazzyarchitects/awesome-developers',
  'https://github.com/jazzyarchitects/dotenv',
  'https://github.com/jazzyarchitects/bull',
  'https://github.com/jazzyarchitects/ant-design',
  'https://github.com/jazzyarchitects/ascii-emoji',
  'https://github.com/jazzyarchitects/a4academics1',
  'https://github.com/jazzyarchitects/jazzyarchitects.github.io',
];

function loadGithubData() {
  if (sessionStorage.getItem('projects')) {
    return addRepoList();
  }
  var URL = 'https://api.github.com/users/jazzyarchitects/repos';
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      var projectList = [];
      for (var i = 0; i < response.length; i++) {
        if (ignoredRepos.indexOf(response[i].html_url) !== -1) {
          continue;
        }
        projectList.push({
          name: response[i].name,
          url: response[i].html_url,
          description: response[i].description,
          language: response[i].language,
          updatedAt: new Date(response[i].created_at),
        });
      }

      projectList.sort(function(a, b) {
        var aDate = a.updatedAt;
        var bDate = b.updatedAt;
        if (aDate > bDate) return -1;
        if (aDate < bDate) return 1;
        return 0;
      });

      sessionStorage.setItem('projects', JSON.stringify(projectList));

      addRepoList();
    }
  };

  xhttp.open('GET', URL, true);
  xhttp.send();
}

function addRepoList() {
  var rootElement = document.querySelector('.git-repositories');
  if (!rootElement) {
    return;
  }
  var list = JSON.parse(sessionStorage.getItem('projects'));
  list.forEach(function(project) {
    var liElem = document.createElement('li');
    liElem.innerHTML =
      '<a href="' +
      project.url +
      '" target="_blank"><b>' +
      project.name +
      '</b></a>  -  ' +
      project.description;
    rootElement.appendChild(liElem);
  });
}

function toggleProjects(show) {
  var projectItems = document.querySelectorAll(
    '.timeline-container .timeline .container.project',
  );
  projectItems.forEach(function(node) {
    node.style.display = show ? 'block' : 'none';
  });
}
