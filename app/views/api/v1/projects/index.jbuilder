json.call(@projects) do |project|
  json.call(project,
            :id,
            :status,
            :zipcode,
            :description,
            :created_at,
            :updated_at,
            :recurring,
            :timeline,
            :requester_id,
            :latitude,
            :longitude,
            :service)
end
