// 指针
#include <stdio.h>

int main() {
  int a = 1;
  char b;

  printf("a变量的地址 %p\n", &a);
  printf("b变量的地址 %p\n", &b);

  // 声明指针
  int *pa = &a;
  // 取指针保存的内存地址
  printf("pa %p\n", pa);
  // 取指针的指针
  printf("&pa %p\n", &pa);
  // 取指针保存的内存地址指向的变量的值
  printf("*pa %d\n", *pa);

  // 空指针
  int *pNull = NULL;
  printf("空指针pNull %p\n", pNull);

  // 指针运算
  int aa = 11;
  int *paa = &aa;
  printf("paa %p\n", paa);
  printf("++paa %p\n", ++paa);
  printf("--paa %p\n", --paa);
  printf("paa+1 %p\n", paa+1);
  printf("paa-1 %p\n", paa-1);

  return 0;
}