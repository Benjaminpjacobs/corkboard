module Sluggable
  extend ActiveSupport::Concern

  module ClassMethods
    def find(input)
      # monkey patches .find to be able to find by id and slug
      if input.to_i != 0
        super
      else
        find_by_slug(input)
      end
    end
  end

  def to_param
    slug
  end

  def generate_slug
    self.slug = name.parameterize
  end
end
