#The basic concept behind a recursive function follows the following structure

def recursiveFunc():
    if someVal == baseCase:
        return baseCaseValue
    else:
        return recursiveFunc()

#The textbook example of a recurrsive function is the Fibonacci Sequence

def Fibonacci(num):  
    if num <= 1:  
        return num  
    else:  
        return(Fibonacci(num-1) + Fibonacci(num-2))  

