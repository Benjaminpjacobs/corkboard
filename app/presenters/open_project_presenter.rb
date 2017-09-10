class OpenProjectPresenter < SimpleDelegator # :nodoc:
  def to_bid_on
    @to_bid_on ||= open_projects.select do |open_project|
      distance = distance_to(open_project)
      distance < radius && !in?(open_project.pros)
    end
  end
end
