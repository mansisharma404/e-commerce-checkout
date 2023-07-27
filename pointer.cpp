#include <iostream>
using namespace std;

void printPointerBasics() {
int var = 20;
int *ptr;
ptr = &var;
cout << "Value at ptr stores memory location = " << ptr << "\n";
cout << "Value of var  = " << var << "\n";
cout << "Value at *ptr is value of var = " << *ptr << "\n";
}
int main(){
printPointerBasics();
return 0;
}