animal = ["cats"]
animals = ["dogs", "cats", "bunny"]

if animal in animals:
    print(animal)


a = 10
b = 9
c = 5
d = 5

if a > b:
    print("a is greater than b")
elif a < b:
    print("b is greater than a")
else: 
    print("They are equal")


if a == b and c == d:
    print("a and b are equal. c and d are also equal")

if a == b or c == d:
    print("a and b are equal or c and d are equal")