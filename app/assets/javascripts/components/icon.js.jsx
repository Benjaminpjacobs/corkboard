const Icon = React.createClass({
  propTypes: {
    href: React.PropTypes.string,
    id:React.PropTypes.string,
    className:React.PropTypes.string,
    name:React.PropTypes.string
  },
  showsLabel: (e) => {
    e.target.parentElement.nextElementSibling.style.display = 'block';
  },
  hidesLabel: (e) => {
    e.target.parentElement.nextElementSibling.style.display = 'none';
  },
  render: function() {
    const icon = this.props;
    return(
      <div className="icon">
        <a href={icon.href} id={icon.id}>
        <i onMouseEnter={this.showsLabel} onMouseLeave={this.hidesLabel} className={icon.className}></i>
        </a>
          <span className='icon-label'>{icon.name}</span>
      </div>
    )
  }
});