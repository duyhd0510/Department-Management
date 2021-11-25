$(function () {
    if (!isLogin()) {
        window.location.replace("http://127.0.0.1:5500/html/login.html");
    }
    $(".header").load("header.html", function() {
        document.getElementById("fullname").innerHTML = storage.getItem("FULL_NAME");
        if (storage.getItem("ROLE") == "User") {
            document.getElementById("viewListDepartments").style.display = "none";
        }
    });
    $(".main").load("home.html");
    $(".footer").load("footer.html");
});

function isLogin() {
    if (storage.getItem("ID")) {
        return true;
    }
    return false;
}

function logout() {
    storage.removeItem("ID");
    storage.removeItem("FULL_NAME");
    storage.removeItem("USER_NAME");
    storage.removeItem("PASS_WORD");

    window.location.replace("http://127.0.0.1:5500/html/login.html");
}

function clickNavHome() {
    $(".main").load("home.html");
}

function clickNavViewListDepartments() {
    $(".main").load("viewlistdepartments.html", function () {
        buildTable();
    });
}

var departments = [];
var currentPage = 1;
var size = 5;
var sortField = "id";
var isAsc = false;

var minCreateDate = "";
var maxCreateDate = "";

function getListDepartments() {

    var url = "http://localhost:8080/api/v1/departments";
    url += "?page=" + currentPage + "&size=" + size;
    url += "&sort=" + sortField + ',' + (isAsc ? "asc" : "desc");

    var search = document.getElementById("input-search-department").value;
    if (search) {
        url += "&search=" + search;
    }

    if (minCreateDate) {
        url += "&minDate=" + minCreateDate;
    }

    if (maxCreateDate) {
        url += "&maxDate=" + maxCreateDate;
    }
    // call API from server
    $.ajax({
        url: url,
        type: 'GET',
        // data: JSON.stringify(department),
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
        },
        success: function (data, textStatus, xhr) {
            // console.log(data);
            departments = [];
            // success
            departments = data.content;
            fillDepartmentToTable();
            resetDeleteCheckbox();
            pagingTable(data.totalPages);
            renderSortUI();
        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {
                window.location.href = "http://127.0.0.1:5500/html/forbidden.html";
            }
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function pagingTable(pageAmount) {
    var pagingStr = "";

    if (pageAmount > 1 && currentPage > 1) {
        pagingStr +=
            '<li class="page-item">' +
            '<a class="page-link" onClick=prevPaging()>Previous</a>' +
            '</li>'
    }

    for (var i = 0; i < pageAmount; i++) {
        pagingStr +=
            '<li class="page-item ' + (currentPage == i + 1 ? "active" : "") + ' ">' +
            '<a class="page-link" onClick=changePage(' + (i + 1) + ')>' + (i + 1) + '</a>' +
            '</li>'
    }

    if (pageAmount > 1 && currentPage < pageAmount) {
        pagingStr +=
            '<li class="page-item">' +
            '<a class="page-link" onClick="nextPaging()">Next</a>' +
            '</li>'
    }

    $('#pagination').empty();
    $('#pagination').append(pagingStr);
}

function prevPaging() {
    changePage(currentPage - 1);
}

function nextPaging() {
    changePage(currentPage + 1);
}

function changePage(page) {
    if (page == currentPage) {
        return
    }
    currentPage = page;
    buildTable();
}

function resetPaging() {
    currentPage = 1;
    size = 5;
}

function changeSort(feild) {
    if (feild = sortField) {
        isAsc = !isAsc;
    } else {
        sortField = feild;
        isAsc = true;
    }
    buildTable();
}

function renderSortUI() {
    // var sortField = "id";
    // var isAsc = false;

    var sortTypeClazz = isAsc ? "fa-sort-asc" : "fa-sort-desc";

    switch (sortField) {
        case 'name':
            // document.getElementById("heading-name").classList.remove('fa-sort', 'fa-sort-asc', "fa-sort-desc");
            document.getElementById("heading-name").classList.add(sortTypeClazz);
            break;
        case 'author.fullName':

            break;
        case 'createDate':

            break;

        default:
            // document.getElementById("heading-name").classList.remove("fa-sort", "fa-sort-asc", "fa-sort-desc");
            document.getElementById("heading-name").classList.add("fa-sort");
            document.getElementById("heading-author").classList.add("fa-sort");
            document.getElementById("heading-createDate").classList.add("fa-sort");
            break;
    }
}

function resetSort() {
    sortField = 'id';
    isAsc = false;
}

function resetTable() {
    resetPaging();
    resetSort();
    resetSearch();
    resetFilter();
    resetDeleteCheckbox();
}

function resetSearch() {
    document.getElementById("input-search-department").value = "";
}

function handKeyUpEventForSearching(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        handleSearch();
    }
}

function handleSearch() {
    resetPaging();
    resetSort();
    resetDeleteCheckbox();
    buildTable();
}

function changeMinCreateDate(e) {
    minCreateDate = e.target.value;
    resetPaging();
    resetSort();
    resetDeleteCheckbox();
    buildTable();
}

function changeMaxCreateDate(e) {
    maxCreateDate = e.target.value;
    resetPaging();
    resetSort();
    resetDeleteCheckbox();
    buildTable();
}

function resetFilter() {
    minCreateDate = "";
    maxCreateDate = "";
    document.getElementById("minCreateDate").value = "";
    document.getElementById("maxCreateDate").value = "";
}

function refreshTable() {
    resetTable();
    buildTable();
}

function resetDeleteCheckbox() {
    document.getElementById("checkbox-all").checked = false;
    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            checkboxItem.checked = false;
            i++;
        } else {
            break;
        }
    }
}

function fillDepartmentToTable() {
    departments.forEach(function (item, index) {
        $('tbody').append(
            '<tr>' +
            '<td><input id="checkbox-' + index + '" type="checkbox" onClick="onCheckboxItem()"></td>' +
            '<td>' + item.name + '</td>' +
            '<td>' + item.author.fullName + '</td>' +
            '<td>' + item.createDate + '</td>' +
            '<td>' +
            '<a class="edit" title="Edit" data-toggle="tooltip" onclick="openUpdateModal(' + item.id + ')"><i class="material-icons">&#xE254;</i></a>' +
            '<a class="delete" title="Delete" data-toggle="tooltip" onClick="openConfirmDelete(' + item.id + ')"><i class="material-icons">&#xE872;</i></a>' +
            '</td>' +
            '</tr>')
    });
}

function buildTable() {
    $('tbody').empty();
    getListDepartments();
}

function openAddModal() {
    openModal();
    resetFormAdd();
}

function resetFormAdd() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("id_title").innerHTML = "Add Department";
    document.getElementById("author").style.display = "none";
    document.getElementById("authorLabel").style.display = "none";
    document.getElementById("createDate").style.display = "none";
    document.getElementById("dateLabel").style.display = "none";
    hideNameErrorMessage();
}

function openModal() {
    $('#myModal').modal('show');
}

function hideModal() {
    $('#myModal').modal('hide');
}

function hideNameErrorMessage() {
    document.getElementById("errorNameMessage").style.display = "none";
}

function showNameErrorMessage(message) {
    document.getElementById("errorNameMessage").style.display = "block";
    document.getElementById("errorNameMessage").innerHTML = message;
}

function addDepartment() {

    // get data
    var name = document.getElementById("name").value;

    // TODO validate
    // then fail validate ==> return;
    if (!name || name.length < 6 || name.length > 30) {
        showNameErrorMessage("Department name must be from 6 to 30 character!");
        return;
    }

    $.ajax({
        url: "http://localhost:8080/api/v1/departments/name/" + name + "/exists",
        type: 'GET',
        // data: JSON.stringify(department),
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
        },
        success: function (data, textStatus, xhr) {
            if (data) {
                showNameErrorMessage("Department name is exists")
            } else {
                var department = {
                    name: name,
                    authorId: storage.getItem("ID")
                };

                $.ajax({
                    url: 'http://localhost:8080/api/v1/departments',
                    type: 'POST',
                    data: JSON.stringify(department),
                    contentType: "application/json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
                    },
                    success: function (data, textStatus, xhr) {
                        console.log(data);
                        hideModal();
                        showSuccessAlert();
                        resetTable();
                        buildTable();
                    },
                    error(jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                })
            }
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function resetFormUpdate() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    // document.getElementById("id_title").innerHTML = "Add Department";
    document.getElementById("author").style.display = "block";
    document.getElementById("authorLabel").style.display = "block";
    document.getElementById("createDate").style.display = "block";
    document.getElementById("dateLabel").style.display = "block";
    hideNameErrorMessage();
}

var oldName;

function openUpdateModal(id) {

    $.ajax({
        url: "http://localhost:8080/api/v1/departments/" + id,
        type: 'GET',
        // data: JSON.stringify(department),
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
        },
        success: function (data, textStatus, xhr) {
            // console.log(data);
            openModal();
            resetFormUpdate();
            oldName = data.name;

            document.getElementById("id_title").innerHTML = "Update Department";
            document.getElementById("id").value = data.id;
            document.getElementById("name").value = data.name;
            document.getElementById("author").value = data.author.fullName;
            document.getElementById("createDate").value = data.createDate;
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function save() {
    var id = document.getElementById("id").value;

    if (id == null || id == "") {
        addDepartment();
    } else {
        updateDepartment();
    }
}

function updateDepartment() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;

    //validate
    if (!name || name.length < 6 || name.length > 30) {
        showNameErrorMessage("Department name must be from 6 to 30 character!");
        return;
    }

    if (oldName == name) {
        hideModal();
        showSuccessAlert();
        resetTable();
        buildTable();
        return;
    }

    $.ajax({
        url: "http://localhost:8080/api/v1/departments/name/" + name + "/exists",
        type: 'GET',
        // data: JSON.stringify(department),
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
        },
        success: function (data, textStatus, xhr) {
            // console.log(data);
            if (data) {
                showNameErrorMessage("Department name is exists")
            } else {
                var department = {
                    name: name,
                };
                $.ajax({
                    url: 'http://localhost:8080/api/v1/departments/' + id,
                    type: 'PUT',
                    data: JSON.stringify(department),
                    contentType: "application/json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
                    },
                    success: function (data, textStatus, xhr) {
                        console.log(data);
                        hideModal();
                        showSuccessAlert();
                        resetTable();
                        buildTable();
                    },
                    error(jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                })
            }
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}


function openConfirmDelete(id) {
    var index = departments.findIndex(x => x.id == id);
    var name = departments[index].name;

    var result = confirm("Want to delete " + name + "?");
    if (result) {
        deleteDepartment(id);
    }
}

function deleteDepartment(id) {
    // TODO validate

    $.ajax({
        url: 'http://localhost:8080/api/v1/departments/' + id,
        type: 'DELETE',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
        },
        success: function (result) {
            // error
            if (result == undefined || result == null) {
                alert("Error when loading data");
                return;
            }

            // success
            showSuccessAlert();
            resetTable();
            buildTable();
        }
    });
}

function onCheckboxItem() {
    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            if (!checkboxItem.checked) {
                document.getElementById("checkbox-all").checked = false;
                return;
            }
            i++;
        } else {
            break;
        }
    }

    document.getElementById("checkbox-all").checked = true;
}

function onChangeCheckboxAll() {
    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            checkboxItem.checked = document.getElementById("checkbox-all").checked;

            // if (document.getElementById("checkbox-all").checked) {
            //    checkboxItem.checked = true;
            // } else {
            //     checkboxItem.checked = false;
            // }
            i++;

        } else {
            break;
        }
    }
}

function deleteAllDepartment() {
    var ids = [];
    var names = [];

    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            if (checkboxItem.checked) {
                ids.push(departments[i].id);
                names.push(departments[i].name);
            }
            i++;
        } else {
            break;
        }
    }
    console.log(ids);

    var result = confirm("Want to delete " + names + "?");
    if (result) {
        $.ajax({
            url: 'http://localhost:8080/api/v1/departments?ids=' + ids,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USER_NAME") + ":" + storage.getItem("PASS_WORD")));
            },
            success: function (result) {
                // error
                if (result == undefined || result == null) {
                    alert("Error when loading data");
                    return;
                }
                // success
                showSuccessAlert();
                resetTable();
                buildTable();
            }
        });
    }
}

function showSuccessAlert() {
    $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
        $("#success-alert").slideUp(500);
    });
}