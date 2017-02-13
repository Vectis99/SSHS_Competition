using System;
using SouthSaxon;
using SouthSaxon.Geometry;

namespace TestProgram
{
    public class Program
    {
        static void Main(String[] args)
        {
            /*Console.WriteLine("This is a test.");
            string target = IO.ReadString("Input a string to be searched: ");
            string pattern = IO.ReadString("Input the search pattern: ");
            Console.WriteLine("Found: " +  IO.ValidateInputItem(target, pattern));
            Console.ReadLine();*/

            Line line1 = new Line(1, 0);
            Line line2 = new Line(-1, 0);
            Console.WriteLine(line1.Intersect(line2));
            Console.ReadLine();

            //This comment is an example change to test commits: Everything's working!

            //Find example problems:
            //https://drive.google.com/drive/folders/0B3jUhu-NdWs0ZGZ1WHJoYkhmRVU
        }
    }
}
