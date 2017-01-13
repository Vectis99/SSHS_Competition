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

        //Add more functions here.
    }
}
