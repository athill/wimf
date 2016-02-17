
<?php
/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/
$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10)

    ];
});


$factory->define(App\Container::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->word,
        'user_id' => $faker->randomDigitNotNull,
        'description' => $faker->sentence

    ];
});

$factory->define(App\Category::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->word,
        'user_id' => $faker->randomDigitNotNull,
        'container_id' => $faker->randomDigitNotNull

    ];
});


$factory->define(App\Item::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->word,
        // 'user_id' => $faker->randomDigitNotNull,
        'category_id' => $faker->randomDigitNotNull
    ];
});