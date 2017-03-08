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
            List<string> storeList = new List<string>();
            List<string> inList = input.Split(' ').ToList();
            foreach (string toStore in inList)
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
    }
}
