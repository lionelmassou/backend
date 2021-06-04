
db.createCollection("students")
db.createCollection("favorites")
db.createCollection("languages")
db.createCollection("sutdents_language")


db.students.find()
db.students.insert({name: "véronique", city: "Paris"})
db.students.find()
db.students.insert({name: "steeven", city: "Lyon"})
db.students.find()
db.students.insert({name: "marc", city: "Marseille"})
db.students.find()
db.students.insert({name: "nour", city: "Lyon"})
db.students.find()
db.students.insert({name: "romain", city: "Paris"})
db.students.find()
db.students.insert({name: "sophie", city: "Paris"})


db.languages.find()
db.languages.insert({name: "French"})
db.languages.find()
db.languages.insert({name: "English"})
db.languages.find()
db.languages.insert({name: "German"})
db.languages.find()
db.languages.insert({name: "Spanish"})
db.languages.find()
db.languages.insert({name: "Mandarin"})


db.favorites.find()
db.favorites.insert({class: "maths", sport: "cricket", student_id: ObjectId("60ba2028b3eb7cfb83f0c79d")
})
db.favorites.find()
db.favorites.insert({class: "music", sport: "hip-hop", student_id: ObjectId("60ba207ab3eb7cfb83f0c7a1")
})
db.favorites.find()
db.favorites.insert({class: "arts", sport: "boxing", student_id: ObjectId("60ba1fb1b3eb7cfb83f0c79c")
})
db.favorites.find()
db.favorites.insert({class: "literature", sport: "tennis", student_id: ObjectId("60ba2047b3eb7cfb83f0c79e")
})
db.favorites.find()
db.favorites.insert({class: "computer science", sport: "tennis", student_id: ObjectId("60ba2075b3eb7cfb83f0c7a0")
})
db.favorites.find()
db.favorites.insert({class: "arts", sport: "baseball", student_id: ObjectId("60ba2067b3eb7cfb83f0c79f")
})
       
db.students_language.insert(
{
    student_id: ObjectId("60ba1fb1b3eb7cfb83f0c79c"),
    language_id: ObjectId("60ba257fb3eb7cfb83f0c7ad")
})

db.students_language.insert(
{
    student_id: ObjectId("60ba1fb1b3eb7cfb83f0c79c"),
    language_id: ObjectId("60ba2588b3eb7cfb83f0c7ae")
})

db.students_language.insert(
{
    student_id: ObjectId("60ba2028b3eb7cfb83f0c79d"),
    language_id: ObjectId("60ba257fb3eb7cfb83f0c7ad")
})

db.students_language.insert(
{
    student_id: ObjectId("60ba2028b3eb7cfb83f0c79d"),
    language_id: ObjectId("60ba258fb3eb7cfb83f0c7af")
})

db.students_language.insert(
{
    student_id: ObjectId("60ba2047b3eb7cfb83f0c79e"),
    language_id: ObjectId("60ba257fb3eb7cfb83f0c7ad")
})

db.students_language.insert(
{
    student_id: ObjectId("60ba2067b3eb7cfb83f0c79f"),
    language_id: ObjectId("60ba257fb3eb7cfb83f0c7ad")
})

db.students_language.insert(
{
    student_id: ObjectId("60ba2067b3eb7cfb83f0c79f"),
    language_id: ObjectId("60ba2588b3eb7cfb83f0c7ae")
})

db.students_language.insert(
{
    student_id: ObjectId("60ba2067b3eb7cfb83f0c79f"),
    language_id: ObjectId("60ba2597b3eb7cfb83f0c7b0")
})

db.students_language.insert(
{
    student_id: ObjectId("60ba2067b3eb7cfb83f0c79f"),
    language_id: ObjectId("60ba259eb3eb7cfb83f0c7b1")
})

db.students_language.insert(
{
    student_id: ObjectId("60ba2075b3eb7cfb83f0c7a0"),
    language_id: ObjectId("60ba257fb3eb7cfb83f0c7ad")
})

db.students_language.insert(
{
    student_id: ObjectId("60ba2075b3eb7cfb83f0c7a0"),
    language_id: ObjectId("60ba259eb3eb7cfb83f0c7b1")
})

db.students_language.insert(
{
    student_id: ObjectId("60ba207ab3eb7cfb83f0c7a1"),
    language_id: ObjectId("60ba257fb3eb7cfb83f0c7ad")
})

db.students_language.insert(
{
    student_id: ObjectId("60ba207ab3eb7cfb83f0c7a1"),
    language_id: ObjectId("60ba2588b3eb7cfb83f0c7ae")
})

db.students_language.insert(
{
    student_id: ObjectId("60ba207ab3eb7cfb83f0c7a1"),
    language_id: ObjectId("60ba258fb3eb7cfb83f0c7af")
})
)
-- RAPPORT 1
-- 1. Récupérer toutes les colonnes de l’étudiant.e avec l’ID 3
db.students.find({"_id": ObjectId("60ba1fb1b3eb7cfb83f0c79c")})

-- 2. Récupérer toutes les colonnes l’étudiant.e avec l’ID 6
db.students.find({"_id": ObjectId("60ba207ab3eb7cfb83f0c7a1")})

-- 3. Récupérer le nom et la ville de l’étudiant.e avec l’ID 1
db.students.find({"_id": ObjectId("60ba1fb1b3eb7cfb83f0c79c")},{"name":1},{"city":1})

-- 4. Récupérer le nom de l’étudiant.e avec l’ID 2
db.students.find({"_id": ObjectId("60ba2028b3eb7cfb83f0c79d")},{"name":1})

-- 5. Récupérer toutes les colonnes des étudiant.e.s de la ville de Paris
db.students.find({"city": "Paris"})

-- 6. Récupérer les noms des étudiant.es de la ville de Lyon
db.students.find({"city": "Lyon"}, {"name":1})

-- RAPPORT 2
-- 1. Pour l’étudiant.e d’ID 5, récupérer toutes les colonnes sur l’étudiant.e et ses activités favorites

db.students.aggregate([
{
    $lookup:
    {
           from: "favorites",
           localFiels: "_id", //: ObjectId("60ba2075b3eb7cfb83f0c7a0")
           foreignField: "sport",
           as : "test"
    }
 }])


-- 2. Pour l’étudiant.e d’ID 4, récupérer son nom et son sport préféré
-- 3. Pour l’étudiant.e d’ID 1, récupérer son nom et sa matière préférée
-- 4. Récupérer toutes les colonnes de l’étudiant.e qui aime la musique
-- 5. Récupérer le nom des étudiant.e.s qui aime le tennis
-- 6. Récupérer le nom des étudiant.e.s qui aime les matières artistiques
-- 7. Récupérer le nombre d’étudiant.e.s de la ville de Paris