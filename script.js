console.log('Hi there, thanks for visiting my site.. If you have any suggestions regarding the page, contact at aexkithatsme@gmail.com');


function contact() {
    document.getElementById("cbtn").classList.add("active");
    document.getElementById("adbtn").classList.remove("active");
    document.getElementById("home").classList.remove("active");
    $("#start").remove();
    $("#preference").remove();
    $("#veg").remove();
    $("#nonveg").remove();
    $("#recipe").remove();
    document.getElementById("contact").style.display = "block";
    $("#check").prop("checked", false);
}

function aboutdev() {
    $("#check").prop("checked", false);
    window.alert('Name: Aman Jena\nDescription: Creator and Developer of the Page');
}

function second() {
    document.getElementById("start").style.display = "none";
    document.getElementById("preference").style.display = "block";
}

function veg() {
    document.getElementById("preference").style.display = "none";
    document.getElementById("veg").style.display = "block";
}

function nonveg() {
    document.getElementById("preference").style.display = "none";
    document.getElementById("nonveg").style.display = "block";
}

var given = [];
var veg_dishes = []
var nonveg_dishes = []

const store = new SteinStore(
    "https://api.steinhq.com/v1/storages/5e7f7576b88d3d04ae081632"
);

store.read("Sheet1").then(data => {
    //data recieved via api
    // console.log(data);

    //data stored into respective category(Veg/NonVeg)
    data.forEach(({ Recipe_Name, Ingredients, Type }) => {
        var regex = /\(([^)]+)\);/gi;
        var k = Ingredients.split(regex);
        var ingredient = [Recipe_Name]

        for (var i = 0; i < k.length; i++) {
            if (i % 2 == 0 && k[i] != "")
                ingredient.push(k[i])
        }
        Type == 'Veg' ? veg_dishes.push(ingredient) : nonveg_dishes.push(ingredient);
    });
});

//display recipe card in the final page
function showrecipe(selected) {
    //getting the selected checkboxes inputs
    var checkboxes;
    selected == 'veg' ? checkboxes = document.getElementsByName("ingredient") : checkboxes = document.getElementsByName("ingredients")
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
            given.push(checkboxes[i].value);
        }
    }

    //checking to select atleast one ingredient
    if (given.length == 0) {
        alert('No Ingredients are Selected. Select Atleast One Ingredient.')
        return;
    }

    var newa = [];
    selected == 'veg' ? checkboxes = document.getElementsByClassName("vegspecial") : checkboxes = document.getElementsByClassName("nonvegspecial")

    for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
            newa.push(checkboxes[i].value);
        }
    }

    //checking to select atleast one maggi ingredient
    if (newa.length == 0) {
        alert(`No Maggi Products are Selected. Select Atleast One Maggie Product.`)
        return;
    }
    //Making the selecting ingredient page disappear and going to final page
    $("#veg").remove();
    $("#nonveg").remove();
    document.getElementById("recipe").style.display = "block";
    document.getElementById("result").style.display = "block";
    // document.getElementById("dishes").style.display = "block";

    var dishes;
    selected == 'veg' ? dishes = veg_dishes : dishes = nonveg_dishes;
    var dat = [];
    var flag = false;

    for (var i = 0; i < dishes.length; i++) {
        var c = 0;
        for (var j = 1; j < dishes[i].length; j++) {
            for (var k = 0; k < given.length; k++) {
                if (dishes[i][j] == given[k]) {
                    c++;
                }
            }
        }
        if (c == dishes[i].length - 1) {
            store.read("Sheet1", { search: { Recipe_Name: dishes[i][0] } }).then(data => {
                data.forEach(({ Recipe_Name, Ingredients, Type, Estimated_Time, Image_for_recipe, Recipe_steps }) => {
                    var regex = /;/;
                    var k = Ingredients.split(regex);
                    var l = Recipe_steps.split(regex);
                    var ingredient = [Recipe_Name]
                    $("#result").append(
                        `<li><div class="card mb-3" style="background:black; color:white;">
                            <div class="row no-gutters">
                                <div class="col-md-4" style="display:flex; justify-content:center; align-items: center">
                                    <img src="` + Image_for_recipe + `" class="card-img" alt="Image not found">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                    <h3 class="card-title" style="color:rgb(223, 176, 22)">` + Recipe_Name + `</h3>
                                    <p class="card-text"><h5 style="color:rgb(223, 176, 22)">Estimated Time: </h5>` + Estimated_Time + `mins</p>
                                    <ul class="show_ingredients"><h5 style="color:rgb(223, 176, 22)">Ingredients Required:</h5></ul>
                                    <ol class="show_recipe_steps"><h5 style="color:rgb(223, 176, 22); margin-top:10px;">Steps:</h5></ol>
                                    </div>
                                </div>
                            </div>
                        </div></li>`);
                    for (var i = 0; i < k.length; i++) {
                        if (k[i] != "")
                            $(".show_ingredients").append('<li>' + k[i] + '</li>');
                    }

                    for (var i = 0; i < l.length; i++) {
                        if (l[i] != "") {
                            $(".show_recipe_steps").append('<li>' + l[i] + '</li>');
                        }
                    }
                });
            });
            flag = true;
        }
        dat.push(c / (dishes[i].length - 1));
    }
    console.log(dat)
    if (flag == false) {
        for (var i = 0; i < dat.length; i++) {
            if (dat[i] == Math.max.apply(null, dat)) {
                store.read("Sheet1", { search: { Recipe_Name: dishes[i][0] } }).then(data => {
                    data.forEach(({ Recipe_Name, Ingredients, Type, Estimated_Time, Image_for_recipe, Recipe_steps }) => {
                        var regex = /;/;
                        var k = Ingredients.split(regex);
                        var l = Recipe_steps.split(regex);
                        var ingredient = [Recipe_Name]
                        $("#result").append(
                            `<li><div class="card mb-3" style="background:black; color:white;">
                                <div class="row no-gutters">
                                    <div class="col-md-4" style="display:flex; justify-content:center; align-items: center">
                                        <img src="` + Image_for_recipe + `" class="card-img" alt="Image not found">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                        <h3 class="card-title" style="color:rgb(223, 176, 22)">` + Recipe_Name + `</h3>
                                        <p class="card-text"><h5 style="color:rgb(223, 176, 22)">Estimated Time: </h5>` + Estimated_Time + `mins</p>
                                        <ul class="show_ingredients"><h5 style="color:rgb(223, 176, 22)">Ingredients Required:</h5></ul>
                                        <ol class="show_recipe_steps"><h5 style="color:rgb(223, 176, 22); margin-top:10px;">Steps:</h5></ol>
                                        </div>
                                    </div>
                                </div>
                            </div></li>`);
                        for (var i = 0; i < k.length; i++) {
                            if (k[i] != "")
                                $(".show_ingredients").append('<li>' + k[i] + '</li>');
                        }

                        for (var i = 0; i < l.length; i++) {
                            if (l[i] != "") {
                                $(".show_recipe_steps").append('<li>' + l[i] + '</li>');
                            }
                        }
                    });
                });
            }
        }
    }
}
