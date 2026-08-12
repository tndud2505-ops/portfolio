(function () {
  document.documentElement.classList.add("js");
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.getElementById("site-menu");
  const year = document.getElementById("current-year");
  const mobileMenuQuery = window.matchMedia("(max-width: 760px)");
  let closeMobileMenu = () => {};

  if (year) year.textContent = String(new Date().getFullYear());

  if (menuButton && menu) {
    const setMenuState = (expanded) => {
      const isMobile = mobileMenuQuery.matches;
      const isExpanded = isMobile ? expanded : true;
      menuButton.setAttribute("aria-expanded", String(isExpanded));
      menuButton.setAttribute(
        "aria-label",
        isExpanded ? "메뉴 닫기" : "메뉴 열기",
      );
      menu.classList.toggle("is-collapsed", !isExpanded);
    };
    closeMobileMenu = () => setMenuState(false);

    setMenuState(false);
    window.requestAnimationFrame(() => setMenuState(false));
    window.addEventListener("load", () => setMenuState(false));
    window.addEventListener("resize", () => setMenuState(false));
    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      setMenuState(!isExpanded);
    });

    menu.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (link && mobileMenuQuery.matches) {
        closeMobileMenu();
      }
    });

    mobileMenuQuery.addEventListener("change", () => setMenuState(false));
  }

  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const setCurrentNav = (currentLink) => {
    navLinks.forEach((link) => {
      const isCurrent = link === currentLink;
      link.classList.toggle("is-current", isCurrent);
      if (isCurrent) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };
  let programmaticNav = null;

  const initialHash = window.location.hash;
  let initialRoutePending = Boolean(initialHash);
  const initialNav = navLinks.find(
    (link) => link.getAttribute("href") === initialHash,
  );
  if (initialNav) setCurrentNav(initialNav);

  const settleInitialHash = () => {
    if (!initialHash) return;
    const target = document.getElementById(initialHash.slice(1));
    if (!target) return;
    target.scrollIntoView({ block: "start", behavior: "auto" });
    setCurrentNav(
      navLinks.find(
        (link) => link.getAttribute("href") === initialHash,
      ),
    );
    window.setTimeout(() => {
      if (window.location.hash === initialHash) {
        setCurrentNav(
          navLinks.find(
            (link) => link.getAttribute("href") === initialHash,
          ),
        );
      }
      initialRoutePending = false;
    }, 300);
  };
  window.addEventListener("load", () => {
    window.requestAnimationFrame(settleInitialHash);
  });

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (initialRoutePending || programmaticNav) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setCurrentNav(
          navLinks.find(
            (link) => link.getAttribute("href") === `#${visible.target.id}`,
          ),
        );
      },
      { rootMargin: "-24% 0px -62% 0px", threshold: [0.1, 0.35, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.getElementById(link.getAttribute("href").slice(1));
      if (!target) return;
      event.preventDefault();
      programmaticNav = link;
      setCurrentNav(link);
      closeMobileMenu();
      history.replaceState(null, "", link.getAttribute("href"));
      target.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
      window.setTimeout(() => {
        if (programmaticNav !== link) return;
        setCurrentNav(link);
        programmaticNav = null;
      }, 900);
    });
  });

  const projectTabs = [...document.querySelectorAll("[data-project-filter]")];
  const projectCards = [
    ...document.querySelectorAll("[data-project-category]"),
  ];
  const projectPanel = document.getElementById("project-panel");

  const applyProjectFilter = (selectedTab) => {
    const selectedFilter = selectedTab.dataset.projectFilter;

    projectTabs.forEach((item) => {
      const isSelected = item === selectedTab;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-selected", String(isSelected));
      item.tabIndex = isSelected ? 0 : -1;
    });

    projectCards.forEach((card) => {
      const isVisible =
        selectedFilter === "all" ||
        card.dataset.projectCategory === selectedFilter;
      card.hidden = !isVisible;
    });

    if (projectPanel) {
      projectPanel.setAttribute("aria-labelledby", selectedTab.id);
    }
  };

  projectTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => applyProjectFilter(tab));
    tab.addEventListener("keydown", (event) => {
      const keyMoves = { ArrowLeft: -1, ArrowRight: 1 };
      if (
        !(event.key in keyMoves) &&
        event.key !== "Home" &&
        event.key !== "End"
      ) {
        return;
      }

      event.preventDefault();
      const nextIndex =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? projectTabs.length - 1
            : (index + keyMoves[event.key] + projectTabs.length) %
              projectTabs.length;
      projectTabs[nextIndex].focus();
      applyProjectFilter(projectTabs[nextIndex]);
    });
  });

  if (projectTabs.length) applyProjectFilter(projectTabs[0]);

  const hydrateCareerSource = async () => {
    if (
      !document.querySelector(
        "[data-career-company], [data-career-direction-intro], [data-career-project-id]",
      )
    ) {
      return;
    }
    try {
      const response = await fetch("./data/career-public.json", {
        cache: "no-store",
      });
      if (!response.ok) return;
      const source = await response.json();
      const employmentById = new Map(
        source.employment.map((item) => [item.id, item]),
      );

      document.querySelectorAll("[data-career-company]").forEach((article) => {
        const record = employmentById.get(article.dataset.careerCompany);
        if (!record) return;

        const period = article.querySelector("time");
        const company = article.querySelector(".record-heading h3");
        const role = article.querySelector(".record-role");
        const summary = article.querySelector("[data-career-summary]");
        const projectList = article.querySelector("ul.record-bullets");
        const capabilityList = article.querySelector("ol.record-skills");
        const detailLink = article.querySelector("[data-career-detail-link]");

        if (period) period.textContent = record.periodLabel;
        if (company) company.textContent = record.company;
        if (role) role.textContent = record.role;
        if (summary) summary.textContent = record.summary;

        if (projectList) {
          projectList.replaceChildren(
            ...record.projects.map((project) => {
              const item = document.createElement("li");
              const title = document.createElement("strong");
              const scope = document.createElement("span");
              title.textContent = project.name;
              scope.textContent = project.scope;
              item.append(title, scope);
              return item;
            }),
          );
        }

        if (capabilityList) {
          capabilityList.replaceChildren(
            ...record.capabilities.map((capability) => {
              const item = document.createElement("li");
              const text = document.createElement("span");
              text.textContent = capability;
              item.append(text);
              return item;
            }),
          );
        }

        if (detailLink) {
          detailLink.href = record.detailPath;
          detailLink.replaceChildren(
            document.createTextNode(record.detailLabel),
            Object.assign(document.createElement("span"), {
              textContent: "→",
            }),
          );
          detailLink.lastElementChild.setAttribute("aria-hidden", "true");
        }
      });

      const directionIntro = document.querySelector(
        "[data-career-direction-intro]",
      );
      const directionList = document.querySelector(
        "[data-career-direction-list]",
      );
      if (directionIntro) directionIntro.textContent = source.direction.intro;
      if (directionList) {
        directionList.replaceChildren(
          ...source.direction.priorities.map((priority) => {
            const item = document.createElement("li");
            const title = document.createElement("strong");
            const description = document.createElement("span");
            title.textContent = priority.title;
            description.textContent = priority.description;
            item.append(title, description);
            return item;
          }),
        );
      }

      const projectsById = new Map(
        source.personalProjects.map((project) => [project.id, project]),
      );
      document.querySelectorAll("[data-career-project-id]").forEach((card) => {
        const project = projectsById.get(card.dataset.careerProjectId);
        if (!project) return;

        card.dataset.projectCategory = project.category;
        const title = card.querySelector(".project-card-body h3");
        const description = card.querySelector(
          ".project-card-body > p:not(.project-card-meta)",
        );
        const mediaLink = card.querySelector(".project-card-media");
        const detailLink = [...card.querySelectorAll(".project-card-actions a")].find(
          (link) => !link.target,
        );
        const externalLink = card.querySelector(
          '.project-card-actions a[target="_blank"]',
        );

        if (title) title.textContent = project.name;
        if (description) description.textContent = project.description;
        if (mediaLink) {
          mediaLink.href = project.detailPath;
          mediaLink.setAttribute("aria-label", `${project.name} 상세 보기`);
        }
        if (detailLink) detailLink.href = project.detailPath;
        if (externalLink && project.externalUrl) {
          externalLink.href = project.externalUrl;
        }
      });

      if (projectTabs.length) {
        const selected = projectTabs.find(
          (tab) => tab.dataset.projectFilter === "all",
        );
        if (selected) applyProjectFilter(selected);
      }
    } catch (_error) {
      // Keep the authored HTML as a local/offline fallback when data is absent.
    }
  };

  hydrateCareerSource();

  const evidenceImages = [
    ...document.querySelectorAll(
      ".case-section--evidence .case-gallery img",
    ),
  ];

  if (evidenceImages.length) {
    const evidenceDialog = document.createElement("dialog");
    const evidenceShell = document.createElement("div");
    const evidenceClose = document.createElement("button");
    const evidenceMedia = document.createElement("img");
    const evidenceCaption = document.createElement("p");

    evidenceDialog.className = "evidence-lightbox";
    evidenceDialog.setAttribute("aria-label", "프로젝트 화면 크게 보기");
    evidenceShell.className = "evidence-lightbox-shell";
    evidenceClose.className = "evidence-lightbox-close";
    evidenceClose.type = "button";
    evidenceClose.textContent = "닫기";
    evidenceMedia.alt = "";

    evidenceShell.append(evidenceClose, evidenceMedia, evidenceCaption);
    evidenceDialog.append(evidenceShell);
    document.body.append(evidenceDialog);

    evidenceImages.forEach((image) => {
      const trigger = document.createElement("button");
      const imageLabel = image.getAttribute("alt") || "프로젝트 화면";
      const imageWidth = Number(image.getAttribute("width"));
      const imageHeight = Number(image.getAttribute("height"));
      const figureCaption = image
        .closest("figure")
        ?.querySelector("figcaption");

      trigger.className = "evidence-image-trigger";
      trigger.type = "button";
      trigger.setAttribute("aria-label", `${imageLabel} 크게 보기`);
      trigger.title = "원본 크기로 보기";
      if (imageWidth > 0 && imageHeight > 0) {
        trigger.style.aspectRatio = `${imageWidth} / ${imageHeight}`;
      }
      image.parentNode.insertBefore(trigger, image);
      trigger.append(image);

      trigger.addEventListener("click", () => {
        if (typeof evidenceDialog.showModal !== "function") {
          window.open(image.currentSrc || image.src, "_blank", "noopener");
          return;
        }

        evidenceMedia.src = image.currentSrc || image.src;
        evidenceMedia.alt = imageLabel;
        evidenceCaption.textContent = figureCaption?.textContent.trim() || "";
        evidenceDialog.showModal();
      });
    });

    evidenceClose.addEventListener("click", () => evidenceDialog.close());
    evidenceDialog.addEventListener("click", (event) => {
      if (event.target === evidenceDialog) evidenceDialog.close();
    });
    evidenceDialog.addEventListener("close", () => {
      evidenceMedia.removeAttribute("src");
      evidenceMedia.alt = "";
      evidenceCaption.textContent = "";
    });
  }
})();
