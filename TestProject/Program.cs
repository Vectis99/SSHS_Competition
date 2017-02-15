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
            Point point1 = new Point(1, 1);
            Point point2 = new Point(0, 0);
            double angle = Circle.QUARTER;
            Console.WriteLine("Rotating " + point1 + " about " + point2 + " " + angle + " radians.");
            Console.WriteLine(point1.Rotate(point2, angle));
            Console.WriteLine("~~~~~~\nARE YOU READY KIDS?");
            Console.ReadLine();

            string theData = "75 95 64 17 47 82 18 35 87 10 20 04 82 47 65 19 01 23 75 03 34 88 02 77 73 07 63 67 99 65 04 28 06 16 70 92 41 41 26 56 83 40 80 70 33 41 48 72 33 47 32 37 16 94 29 53 71 44 65 25 43 91 52 97 51 14 70 11 33 28 77 73 17 78 39 68 17 57 91 71 52 38 17 14 91 43 58 50 27 29 48 63 66 04 68 89 53 67 30 73 16 69 87 40 31 04 62 98 27 23 09 70 98 73 93 38 53 60 04 23";
            Console.WriteLine("Longest path");
            string[] splitData = theData.Split(' ');
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
            for (int pyramidRowSize = 3; pyramidRowSize <=15; pyramidRowSize++)
            {
                int startOfRowIndex = sumTo(pyramidRowSize) - pyramidRowSize;
                int endOfRowIndex = startOfRowIndex + pyramidRowSize - 1;
                goodPyramid[startOfRowIndex] = pyramid[startOfRowIndex] +  goodPyramid[startOfRowIndex - pyramidRowSize]; //First term in row
                for (int j = startOfRowIndex + 1; j < endOfRowIndex; j++)
                {
                    int option1 = goodPyramid[j - pyramidRowSize] + pyramid[j];
                    int option2 = goodPyramid[j - pyramidRowSize + 1] + pyramid[j];
                    if (option1 > option2)
                        goodPyramid[j] = option1;
                    else
                        goodPyramid[j] = option2;
                }
                goodPyramid[endOfRowIndex] = pyramid[endOfRowIndex] + goodPyramid[sumTo(pyramidRowSize-1) - 1]; //Last term in row
            }
            int max = 0;
            foreach(int end in goodPyramid) //This is extremely stupid but I'm too lazy to make a for loop with sumTo(14) to sumTo(15) 
            {
                if (end > max)
                    max = end;
            }
            Console.WriteLine("Max: " + max);
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
