
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  const backTop = document.querySelector('.back-top');

  const onScroll = () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 15);
    if (backTop) backTop.classList.toggle('show', window.scrollY > 450);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
      toggle.innerHTML = links.classList.contains('open') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }
  if (backTop) backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  if (window.AOS) AOS.init({duration:700, once:true, offset:70});

  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const buttons = group.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('[data-category]');
    buttons.forEach(button => button.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    }));
  });

  const form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (window.Swal) {
        Swal.fire({
          icon:'success',
          title:'Thank you!',
          text:'Your message has been prepared. Connect this form to a backend or email service to receive submissions.',
          confirmButtonColor:'#159b25'
        });
      } else {
        alert('Thank you! Connect this form to a backend or email service to receive submissions.');
      }
      form.reset();
    });
  }

  document.querySelectorAll('[data-demo-link]').forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    Swal.fire({icon:'info',title:'Coming soon',text:'This section will be updated as the company grows.',confirmButtonColor:'#159b25'});
  }));
});
