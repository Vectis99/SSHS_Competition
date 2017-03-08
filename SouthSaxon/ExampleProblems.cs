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
            //Time spent writing: 25.38 (Including adding fractions to RegexReference)
            //Time spent testing and debugging: 15.50
            //Total 41.18 (ew!)
            //Could be improved: Handling Input
            bool inputting = true;
            while (inputting)
            {
                string input = IO.ReadString("Enter a pair of fractions, separated by a space. Enter 0/0 to terminate.\n", true, "0/0", true);
                string[] brokenInput = input.Split(' ');
                if (brokenInput.Length != 2)
                {
                    bool wrongNumber = false;
                    if (brokenInput.Length == 1)
                    {
                        if (brokenInput[0] == "0/0")
                        {
                            inputting = false;
                            Console.WriteLine("Program end.");
                        }
                        else
                        {
                            wrongNumber = true;
                        }
                    }
                    else
                    {
                        wrongNumber = true;
                    }
                    if (wrongNumber)
                    {
                        Console.WriteLine("Invalid input: Wrong number of fractions (" + brokenInput.Length + "):");
                        foreach (string s in brokenInput)
                        {
                            Console.WriteLine(s);
                        }
                    }
                }
                else if (brokenInput[0] == "0/0" || brokenInput[1] == "0/0")
                {
                    inputting = false;
                    Console.WriteLine("Program end.");
                }
                else if (!IO.ValidateInputItem(brokenInput[0], RegexReference.FRACTION) || !IO.ValidateInputItem(brokenInput[1], RegexReference.FRACTION))
                {
                    Console.WriteLine("Input is not a fraction.");
                }
                else //Input checks out!
                {
                    //Using doubles because why the heck not?! Actually I shouldn't do this. Oh well. Too late now. RegexReference has been updated with good and bad fraction reader things.
                    String[] fraction1 = brokenInput[0].Split('/');
                    String[] fraction2 = brokenInput[1].Split('/');
                    int numerator1 = int.Parse(fraction1[0]);
                    int denominator1 = int.Parse(fraction1[1]);
                    int numerator2 = int.Parse(fraction2[0]);
                    int denominator2 = int.Parse(fraction2[1]);

                    int common = denominator1 * denominator2;
                    int subtractFrom = numerator1 * denominator2;
                    int subtractThis = numerator2 * denominator1;

                    int unreducedNumerator = subtractFrom - subtractThis;

                    bool isNegative = false;
                    //Weird cases
                    //Negatives
                    if (unreducedNumerator < 0)
                    {
                        unreducedNumerator *= -1;
                        isNegative = !isNegative;
                    }
                    if(common < 0)
                    {
                        common *= -1;
                        isNegative = !isNegative;
                    }



                    bool reduced = false;
                    while (!reduced)
                    {
                        reduced = true;
                        if (unreducedNumerator != 1)
                        {
                            for (int i = 2; i <= unreducedNumerator; i++) //Doesn't start at one since it would get caught at num and denom % 1 //We also don't deal with negative scumbag numbers
                            {
                                if (unreducedNumerator % i == 0) //If the numerator can be divided by something
                                {
                                    if (common % i == 0)
                                    {
                                        unreducedNumerator = unreducedNumerator / i;
                                        common = common / i;
                                        i = unreducedNumerator + 1; //Finish the loop; we did the reduction. Let's try again
                                        reduced = false;
                                    }
                                }
                            }
                        }
                    }
                    //We reduced it!
                    if(isNegative)
                    {
                        Console.Write("-");
                    }
                    Console.WriteLine(unreducedNumerator + "/" + common);
                }
            }
            //End of method; user stopped inputting. Not really any garbage collection or anything to do, so that's it! :3
        }

        /// <summary>
        /// Like a factorial but with addition, also known as triangle numbers.
        /// I'm just putting this here because I'm too lazy to find a proper home for it. :(
        /// </summary>
        /// <param name="sumFrom">The number to collect the sum/factorial/thing of.</param>
        /// <returns>The triangle number of this integer</returns>
        public static int sumTo(int sumFrom)
        {
            if (sumFrom == 0)
                return sumFrom;
            else
                return sumFrom + sumTo(sumFrom - 1);
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
