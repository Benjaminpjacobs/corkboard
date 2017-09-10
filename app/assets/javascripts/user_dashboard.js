// const API = 'https://corkboard-services.herokuapp.com/api/v1/projects';
const API = 'http://localhost:3000/api/v1/projects';

document.addEventListener("DOMContentLoaded", () => {
    const domVars = {
        $openProject: $('.open-project'),
        $acceptedProject: $('.accepted-project'),
        $closedProject: $('.closed-project'),
    }
    const userVars = {
        user: $('#user').data("user"),
        token: $('#token').data("token"),
    }
    getAllProjects(domVars, userVars);

    $('.accepted-project').on('submit', '.close-form', (event) => {
        event.preventDefault()
        const id = event.currentTarget.children.project_id.value
        const token = event.currentTarget.children.token.value
        updateProject(id, token, domVars, userVars);
    })
});

const getProjects = (user) =>
    $.ajax({
        url: API + `/find_all?requester_id=${user}`,
        method: 'GET',
    })

const postProject = (id, token) =>
    $.ajax({
        url: API + '/' + id,
        method: 'PUT',
        data: { project: { status: 'closed', token: token } },
    })

const clearCollections = (domVars) => {
    Object.keys(domVars).forEach((key) => domVars[key].empty())
}

const displayNoContent = (domVars) => {
    Object.keys(domVars).forEach((key) => {
        let node = domVars[key]
        let verb = key.split('Project')[0].slice(1)
        if (node[0].childElementCount === 0) { node.append(noContent(verb)) }
    })
}

const getAllProjects = (domVars, userVars) => {
    clearCollections(domVars)
    getProjects(userVars.user)
        .then((projects) => {
            projects.forEach((project) => {
                switch (project.status) {
                    case "open":
                        domVars.$openProject.append(openOrClosedProject(project))
                        break;
                    case "accepted":
                        domVars.$acceptedProject.append(acceptedProject(project, userVars.token))
                        break;
                    case "closed":
                        domVars.$closedProject.append(openOrClosedProject(project))
                        break;
                }
            })
        })
        .then(() => displayNoContent(domVars))
}

const updateProject = (id, token, domVars, userVars) => {
    postProject(id, token)
        .then(() => {
            getAllProjects(domVars, userVars)
        })
};

const openOrClosedProject = project =>
    '<li class="list-group-item"><p><span class="project-label">Service: </span>' + project.service.name + '</p><p><span class="project-label">Description: </span>' + project.description + '</p><p><span class="project-label">Timeline: </span>' + project.timeline + '</p><p><a href="/projects/' + project.id + '" class="btn btn-primary btn-right" role="button">View Details and Bids</a></p></li>'

const acceptedProject = (project, token) =>
    '<li class="list-group-item"><p><span class="project-label">Service: </span>' + project.service.name + '</p><p><span class="project-label">Description: </span>' + project.description + '</p><p><span class="project-label">Timeline: </span>' + project.timeline + '</p><p><form class="close-form"><input type="hidden" name="token" value=' + token + '><input type="hidden" name="project_id" value="' + project.id + '"><span class="accepted-buttons"><input type="submit" value="Mark as Complete" class="btn btn-warning"></form><a href="/projects/' + project.id + '" class="btn btn-primary" role="button">View Details and Bids</a></span></p></li>'

const noContent = (type) =>
    `<li class="list-group-item"><p>You have no ${type} projects</p>`