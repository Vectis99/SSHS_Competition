using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SouthSaxon
{
    public class ProjectEuler
    {
        /// <summary>
        /// Determines the largest prime factor of a number.
        /// </summary>
        /// <param name="n">The <c>double</c> to take the largest prime factor of.</param>
        /// <returns>The largest prime factor of <c>n</c></returns>
        public static int LargestPrimeFactor(double n)
        {
            bool isPrime = false;
            int i = 2;
            double part = 0;
            while (true)
            {
                part = (n / i);
                if (part % 1 == 0)
                {
                    isPrime = true;
                    for (int j = 2; j < Math.Sqrt(part); j++)
                    {
                        if ((part / j) % 1 == 0)
                            isPrime = false;
                    }

                    if (isPrime)
                    {
                        return (int) part;
                    }
                }
                i++;
            }
        }


        public static int LongestPyramidPath(string pyramidData)
        {
            string[] splitData = pyramidData.Split(' ');
            List<int> pyramid = new List<int>();
            List<int> goodPyramid = new List<int>();
            for (int i = 0; i < splitData.Length; i++)
                pyramid.Add(int.Parse(splitData[i]));
            foreach (int thing in pyramid)
            {
                goodPyramid.Add(thing); //Gotta blow it up for later easy indexing!
            }
            goodPyramid[1] = pyramid[0] + pyramid[1];
            goodPyramid[2] = pyramid[0] + pyramid[2];
            //    1      1
            //   2 3     2
            //  4 5 6    3
            // 7 8 9 10  4
            for (int pyramidRowSize = 3; pyramidRowSize <= 15; pyramidRowSize++)
            {
                int startOfRowIndex = sumTo(pyramidRowSize) - pyramidRowSize;
                int endOfRowIndex = startOfRowIndex + pyramidRowSize - 1;
                goodPyramid[startOfRowIndex] = pyramid[startOfRowIndex] + goodPyramid[startOfRowIndex - pyramidRowSize]; //First term in row
                for (int j = startOfRowIndex + 1; j < endOfRowIndex; j++)
                {
                    int option1 = goodPyramid[j - pyramidRowSize] + pyramid[j];
                    int option2 = goodPyramid[j - pyramidRowSize + 1] + pyramid[j];
                    if (option1 > option2)
                        goodPyramid[j] = option1;
                    else
                        goodPyramid[j] = option2;
                }
                goodPyramid[endOfRowIndex] = pyramid[endOfRowIndex] + goodPyramid[sumTo(pyramidRowSize - 1) - 1]; //Last term in row
            }
            int max = 0;
            foreach (int end in goodPyramid) //This is extremely stupid but I'm too lazy to make a for loop with sumTo(14) to sumTo(15) 
            {
                if (end > max)
                    max = end;
            }
            return max;
        }

        /// <summary>
        /// It's like factorial but with addition
        /// </summary>
        /// <param name="sumFrom">The number to take the addition-factorial thing of</param>
        /// <returns>The addition factorial thing of  the thing</returns>
        public static int sumTo(int sumFrom)
        {
            if (sumFrom == 0)
                return sumFrom;
            else
                return sumFrom + sumTo(sumFrom - 1);
        }
        /* public static int PowerDigitSum()
         {
             int intVersion = (int)Math.Pow(2, 25);
             string stringVersion = intVersion.ToString();
             string digits = ""; //Funnily enough, this will end up reading backwards
             int carryOver = 0;



             for (int i = 0; i < stringVersion.Length; i++)
             {
                 intVersion += carryOver;//[0-9]*\.[0-9]*
                 stringVersion.Reverse();
             }

         }*/

        //Add more functions here.


    }
}
