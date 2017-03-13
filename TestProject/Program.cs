using System;
using SouthSaxon;
using SouthSaxon.Geometry;
using System.Collections.Generic;

/*
 * You should use out unless you need ref
 */

namespace TestProgram
{
    public class Program
    {
        static void Main(String[] args)
        {
            Console.WriteLine(ExampleProblems.prefixNotation("× − 5 6 7"));
            Console.ReadLine();
        }

        public static int sumTo(int sumFrom)
        {
            if (sumFrom == 0)
                return sumFrom;
            else
                return sumFrom + sumTo(sumFrom - 1);
        }

    }
}
