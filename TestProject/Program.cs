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
            //Console.WriteLine("This is a test.");
            // string target = IO.ReadString("Input a string to be searched: ");
            //  string pattern = IO.ReadString("Input the search pattern: ");
            //  Console.WriteLine("Found: " +  IO.ValidateInputItem(target, pattern));
            /*Console.WriteLine("Test ALL THE THINGS!");
            while(true)
            {
                string exp = IO.ReadString("Enter regex!\n");
                string search = IO.ReadString("What will you be having with that?\n");
                int min = IO.ReadInt("Minimum? (Press enter to skip)\n", true, -1);
                int max = IO.ReadInt("Maximum? (Press enter to skip)\n", true, -1);
                if(IO.TestExpression(search,exp,min,max))
                {
                    Console.WriteLine("Match!");
                }
                else
                {
                    Console.WriteLine("Not a match!");
                }
            }*/
            Point point1 = new Point(2, 2);
            Point point2 = new Corner(1, 1);
            Corner corner1 = new Corner(3,3, Circle.QUARTER + Circle.HALF);
            Line mirror = new Line(2, 0);
            Console.WriteLine(point1.Reflect(mirror));
            Console.WriteLine(point2.Reflect(mirror));
            Console.WriteLine(corner1.Reflect(mirror));

            Console.ReadLine();

            

            //This comment is an example change to test commits: Everything's working!

            //Find example problems:
            //https://drive.google.com/drive/folders/0B3jUhu-NdWs0ZGZ1WHJoYkhmRVU
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
