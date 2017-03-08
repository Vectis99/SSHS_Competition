using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SouthSaxon
{
    public class ExampleProblems
    {
        /// <summary>
        /// 2011 Problem 1
        /// </summary>
        public static void fractionSubtraction()
        {
            bool inputting = true;
            while (inputting)
            {
                string input = IO.ReadString("Enter a pair of fractions, separated by a space. Enter 0/0 to terminate.", true, "0/0", true);
                string[] brokenInput = input.Split(' ');
                if (brokenInput.Length < 1 || brokenInput.Length > 2)
                {
                    Console.WriteLine("Invalid input: Wrong number of fractions (" + brokenInput.Length + "):");
                    foreach (string s in brokenInput)
                    {
                        Console.WriteLine(s);
                    }
                }
                else if (brokenInput[0] == "0/0" || brokenInput[1] == "0/0")
                {

                }
            }
        }
        /// <summary>
        /// 2010 Problem 1
        /// </summary>
        public static int postfixNotation(String input)
        {
            List<string> list = input.Split(' ').ToList();
            return postfixNotation(list);
        }
        public static int postfixNotation(List<string> list)
        {
            List<string> storeList = new List<string>();
            foreach (string toStore in list)
            {
                int storeSize = storeList.Count();
                switch (toStore[0])
                {
                    case '+':
                        storeList[storeSize - 2] = (int.Parse(storeList[storeSize - 2]) + int.Parse(storeList[storeSize - 1])).ToString();
                        storeList.RemoveAt(storeSize - 1);
                        break;
                    case '-':
                        storeList[storeSize - 2] = (int.Parse(storeList[storeSize - 2]) - int.Parse(storeList[storeSize - 1])).ToString();
                        storeList.RemoveAt(storeSize - 1);
                        break;
                    case '*':
                        storeList[storeSize - 2] = (int.Parse(storeList[storeSize - 2]) * int.Parse(storeList[storeSize - 1])).ToString();
                        storeList.RemoveAt(storeSize - 1);
                        break;
                    case '/':
                        storeList[storeSize - 2] = (int.Parse(storeList[storeSize - 2]) / int.Parse(storeList[storeSize - 1])).ToString();
                        storeList.RemoveAt(storeSize - 1);
                        break;
                    default:
                        storeList.Add(toStore);
                        break;
                }
            }
            return int.Parse(storeList[0]);
        }
        public static int prefixNotation(String input)
        {
            List<string> list = input.Split(' ').ToList();
            list.Reverse();
            return postfixNotation(list);
            //Doesn't work with subtraction and division because of the position of numbers after reverse of list.
        }
    }
}
