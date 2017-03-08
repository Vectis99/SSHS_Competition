using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SouthSaxon
{
    class ExampleProblems
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
    }
}
