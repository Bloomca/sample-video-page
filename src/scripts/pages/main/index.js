class MainPage {
  constructor({ el, store }) {
    this.el = el;
    // TODO add subscribtion to player and movies
    // and invoke update with new data
    // they will re-render only if data was changed
  }

  render() {
    this.el.innerHTML = '<div>123</div>';
  }
}

export default MainPage;
