using System;
using SouthSaxon;

namespace Debug
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

            //Find example problems:
            //https://drive.google.com/drive/folders/0B3jUhu-NdWs0ZGZ1WHJoYkhmRVU
        }
    }
}
