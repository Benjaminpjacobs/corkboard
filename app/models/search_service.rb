class SearchService
  def initialize
    @conn = Faraday.new(url: 'https://corkboard-micro.herokuapp.com/api/v1')
  end

  def get(query = '')
    @conn.get 'records', { query: query }
  end

  def post(post_params)
    @conn.post 'records', token: JsonWebToken.encode(post_params)
  end

  def put(put_params)
    @conn.put 'records', token: JsonWebToken.encode(put_params)
  end

  def delete(id)
    @conn.delete 'records', token: JsonWebToken.encode(id)
  end
end
