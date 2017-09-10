const appendToList = (data, dataList) => {
    dataList.innerHTML = ''
    if (data) {
        data.forEach((datum) => {
            var option = document.createElement('option')
            option.value = datum.name
            dataList.appendChild(option)
        });
    }
}

const callForList = (e, dataList) => {
    $.getJSON('https://corkboard-services.herokuapp.com/api/search', { query: e.currentTarget.value })
        .then((data) => appendToList(data, dataList))
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInputField = document.getElementById('service_search')
    const dataList = document.getElementById('services_list')

    if (searchInputField) { searchInputField.addEventListener("keyup", (e) => callForList(e, dataList)) }
})