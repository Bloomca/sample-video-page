import MainPage from 'pages/main';

export default function runApplication() {
  console.log(5);
  const page = new MainPage({ el: document.body });
  page.render();
}
