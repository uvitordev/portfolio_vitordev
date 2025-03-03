document.addEventListener('DOMContentLoaded', function () {
  feather.replace();

  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  updateAvatar(savedTheme);

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  themeToggleBtn.addEventListener('click', function () {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateAvatar(isDark ? 'dark' : 'light');
    feather.replace();
  });

  const linksContainer = document.getElementById('links-container');
  const fragment = document.createDocumentFragment();

  links.forEach(link => {
    const li = document.createElement('li');
    li.className = 'link-item';

    li.innerHTML = `
        <a href="${link.url}" target="_blank" rel="preconnect" class="link">
          <div class="link-content">
            <i data-feather="${link.icon}" class="link-icon"></i>
            <div class="link-text">
              <span class="link-title">${link.title}</span>
              ${link.description ? `<span class="link-description">${link.description}</span>` : ''}
            </div>
          </div>
          <i data-feather="external-link" class="link-external"></i>
        </a>`;

    fragment.appendChild(li);
  });

  linksContainer.appendChild(fragment);

 document.getElementById("name").textContent = siteConfig.author.name;;  
  document.getElementById("role").textContent = siteConfig.author.role;
  
  const footerDescriptionElement = document.getElementById("footer-description");
  footerDescriptionElement.textContent = siteConfig.footer.text + " ";
  
  const strongElement = document.createElement('strong');
  strongElement.textContent = siteConfig.footer.highlight;
  footerDescriptionElement.appendChild(strongElement);

  const socialLinksContainer = document.getElementById('social-links-container');
  const socialFragment = document.createDocumentFragment();

  socialLinks.forEach(social => {
    const a = document.createElement('a');
    a.href = social.url;
    a.target = "_blank";
    a.rel = "preconnect";
    a.className = 'social-link';
    a.setAttribute('aria-label', social.name);
    a.innerHTML = `<i data-feather="${social.icon}" class="social-icon"></i>`;
    socialFragment.appendChild(a);
  });

  socialLinksContainer.appendChild(socialFragment);

  function updateAvatar(theme) {
    const avatar = document.getElementById('avatar');
    avatar.src = theme === 'dark' ? siteConfig.author.avatar : (siteConfig.author.avatarLight || siteConfig.author.avatar);
  }

  feather.replace();
});