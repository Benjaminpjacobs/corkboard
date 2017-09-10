
const Browser = React.createClass({

getInitialState: function() {
  return { industries: [] };
  },
 
componentDidMount: function() {
    this.getDataFromApi();
  },

getDataFromApi: function() {
    const self = this;
    $.ajax({
      url: '/api/v1/industry',
      success: function(data) {
        self.setState({ industries: data });
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from API: ', error);
      }
    });
  },

  render: function() {
    const collection = this.state.industries.map((industry)=>{
      return <Industry name={industry.name}
                        uri={industry.uri}
                        slug={industry.slug}
                        key={'industry' + industry.id}/>
    }.bind(this));

    return(
      <div className="browser">
        <ul className="list-group">
            {collection}
        </ul>
      </div>
    )
  }
});