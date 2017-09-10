module ApplicationHelper
  include FormHelper

  def login_button
    if logged_in?
      link_to 'Logout', logout_path, method: :delete
    else
      link_to 'Log In', login_path
    end
  end

  def sign_up_button
    link_to 'Sign Up', choose_account_path unless logged_in?
  end

  def dashboard_button
    if logged_in? && current_user.pro? == false
      link_to 'Dashboard', profile_dashboard_path
    elsif logged_in? && current_user.pro?
      link_to 'Dashboard', pro_dashboard_index_path
    end
  end

  def new_project_button
    if logged_in? && pro_user?
      link_to 'Find Project', pro_dashboard_open_projects_path
    elsif logged_in?
      link_to 'New Project', hire_index_path
    end
  end

  def browse_button
    link_to 'Browse', hire_index_path if logged_in? && !pro_user?
  end

  def home_page?
    params['controller'] == 'home' && params['action'] == 'index'
  end
end
