using System;
using SouthSaxon;

namespace TestProgram
{
    public class Program
    {
        static void Main(String[] args)
        {
            Console.WriteLine("This is a test.");
            string target = IO.ReadString("Input a string to be searched: ");
            string pattern = IO.ReadString("Input the search pattern: ");
            Console.WriteLine("Found: " +  IO.ValidateInputItem(target, pattern));
            Console.ReadLine();

            //This comment is an example change to test commits: Everything's working!

            //Find example problems:
            //https://drive.google.com/drive/folders/0B3jUhu-NdWs0ZGZ1WHJoYkhmRVU
        }
    }
}
