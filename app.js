const testKey = 1;

window.onload = function () {
  const btnMeal = document.getElementById("btnMeal");
  const mealHeader = document.querySelector(".mealDetails");

  btnMeal.addEventListener("click", () => {
    fetch(`https://www.themealdb.com/api/json/v1/${testKey}/random.php`)
      .then((res) => res.json())
      .then((res) => {
        getMealName(res.meals[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    const getMealName = (meal) => {

        const ingredients = [];
      // Get all ingredients from the object. Up to 20
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
        } else {
          // Stop if no more ingredients
          break;
        }
      }

      mealHeader.innerHTML = `
                        <div class="wrapper">
                          <h2 class="mealTitle">
                             ${meal.strMeal}
                          </h2>

                          <h3>Ingredients:</h3>
                          <ol class="mealIngredients">
                    ${ingredients
                      .map((ingredient) => `<li>${ingredient}</li>`)
                      .join("")}
                          </ol>

                          <h3 class="instructionTitle">Instructions:</h3>
                          <p class="mealInstructions">
                            ${meal.strInstructions}
                          </p>

                <h3 class="ytLink">Click <a href=${
                  meal.strYoutube
                } target="_blank">here</a> for a video recipe</h3>
                          
            
                        </div>
                `;
    };
  });
};
