// const API = 'https://corkboard-services.herokuapp.com/api/v1/projects';
const API = 'http://localhost:3000/api/v1/projects';

document.addEventListener("DOMContentLoaded", function() {

    getOpenProjects();
    getAcceptedProjects();
    getCompletedProjects();
});

const submitClose = function() {
    $('.close-form').on('submit', function(event) {
        const id = $('input[name=project_id]').val();
        const token = $('input[name=token]').val();
        updateProject(id, token);
    });
}

const getOpenProjects = function() {
    const user_div = $('#user')
    const user = user_div.data("user");
    $('.open-project').empty();
    return $.ajax({
        url: API + `/find_all?requester_id=${user}&status=0`,
        method: 'GET',
    }).done(function(projects) {
        if (projects.length > 0) {
            projects.forEach(function(project) {
                $('.open-project').append('<li class="list-group-item"><p><span class="project-label">Service: </span>' + project.service.name + '</p><p><span class="project-label">Description: </span>' + project.description + '</p><p><span class="project-label">Timeline: </span>' + project.timeline + '</p><p><a href="/projects/' + project.id + '" class="btn btn-primary btn-right" role="button">View Details and Bids</a></p></li>')
            })
        } else {
            $('.open-project').append('<li class="list-group-item"><p>You have no open projects</p>')
        }
    }).fail(function(error) {
        console.log(error);
    })
};

const getAcceptedProjects = function() {
    const user_div = $('#user')
    const user = user_div.data("user");
    const token_div = $('#token')
    const token = token_div.data("token");
    $('.accepted-project').empty();
    return $.ajax({
        url: API + `/find_all?requester_id=${user}&status=1`,
        method: 'GET',
    }).done(function(projects) {
        if (projects.length > 0) {
            projects.forEach(function(project) {
                $('.accepted-project').append('<li class="list-group-item"><p><span class="project-label">Service: </span>' + project.service.name + '</p><p><span class="project-label">Description: </span>' + project.description + '</p><p><span class="project-label">Timeline: </span>' + project.timeline + '</p><p><form class="close-form"><input type="hidden" name="token" value=' + token + '><input type="hidden" name="project_id" value="' + project.id + '"><span class="accepted-buttons"><input type="submit" value="Mark as Complete" class="btn btn-warning"></form><a href="/projects/' + project.id + '" class="btn btn-primary" role="button">View Details and Bids</a></span></p></li>')
            })
            submitClose();
        } else {
            $('.accepted-project').append('<li class="list-group-item"><p>You have no accepted projects</p>')
        }
    }).fail(function(error) {
        console.log(error);
    })
};

const getCompletedProjects = function() {
    const user_div = $('#user')
    const user = user_div.data("user");
    $('.closed-project').empty();
    return $.ajax({
        url: API + `/find_all?requester_id=${user}&status=2`,
        method: 'GET',
    }).done(function(projects) {
        if (projects.length > 0) {
            projects.forEach(function(project) {
                $('.closed-project').append('<li class="list-group-item"><p><span class="project-label">Service: </span>' + project.service.name + '</p><p><span class="project-label">Description: </span>' + project.description + '</p><p><span class="project-label">Timeline: </span>' + project.timeline + '</p><p><a href="/projects/' + project.id + '" class="btn btn-primary btn-right" role="button">View Details and Bids</a></p></li>')
            })
        } else {
            $('.closed-project').append('<li class="list-group-item"><p>You have no closed projects</p>')
        }
    }).fail(function(error) {
        console.log(error);
    })
};

const updateProject = function(id, token) {
    return $.ajax({
        url: API + '/' + id,
        method: 'PUT',
        data: { project: { status: 'closed', token: token } },
    }).done(function() {
        $('.accepted-project').empty();
        $('.closed-project').empty();
        getAcceptedProjects();
        getCompletedProjects();
    })
};