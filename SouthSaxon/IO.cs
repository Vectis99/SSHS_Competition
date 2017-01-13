using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SouthSaxon
{
    /// <summary>
    /// Handles input and output from the console.
    /// </summary>
    public class IO
    {
        /*
         * READSTRING
         * Because why not?
         */
        public static string ReadString(string prompt = "", bool acceptDefault = false, string backup = "", bool acceptBlank = true)
        {
            Console.Write(prompt);
            string input;
            while (true)
            {
                input = Console.ReadLine();
                if (input.Length >= 0 || acceptBlank)
                    return input;
                else if (!acceptDefault)
                    Console.WriteLine("Input must be able to be parsed to a short.");
                else
                    return backup;
            }
        }
        
        /*
         * NUMBERS
         * Only ReadInt tested
         */

        /// <summary>
        /// Gets a single numerical input from the user.
        /// </summary>
        /// <param name="prompt">A string to read to the user (Does not use a newline without \n) Default \n</param>
        /// <param name="acceptDefault">If this is true, this will not repeatedly prompt the user, instead returning a default upon an invalid input</param>
        /// <param name="backup">The value to return if acceptDefault is true and the input given is invalid</param>
        /// <returns>The numerical input given</returns>
        public static short ReadShort(string prompt = "", bool acceptDefault = false, short backup = 0)
        {
            Console.Write(prompt);
            short input;
            while (true)
            {
                if (short.TryParse(Console.ReadLine(), out input))
                    return input;
                else if (!acceptDefault)
                    Console.WriteLine("Input must be able to be parsed to a short.");
                else
                    return backup;
            }
        }

        /// <summary>
        /// Gets a single numerical input from the user.
        /// </summary>
        /// <param name="prompt">A string to read to the user (Does not use a newline without \n) Default \n</param>
        /// <param name="acceptDefault">If this is true, this will not repeatedly prompt the user, instead returning a default upon an invalid input</param>
        /// <param name="backup">The value to return if acceptDefault is true and the input given is invalid</param>
        /// <returns>The numerical input given</returns>
        public static int ReadInt(string prompt = "", bool acceptDefault = false, int backup = 0)
        {
            Console.Write(prompt);
            int input;
            while(true)
            {
                if (int.TryParse(Console.ReadLine(), out input))
                    return input;
                else if (!acceptDefault)
                    Console.WriteLine("Input must be able to be parsed to an integer.");
                else
                    return backup;
            }
        }

        /// <summary>
        /// Gets a single numerical input from the user.
        /// </summary>
        /// <param name="prompt">A string to read to the user (Does not use a newline without \n) Default \n</param>
        /// <param name="acceptDefault">If this is true, this will not repeatedly prompt the user, instead returning a default upon an invalid input</param>
        /// <param name="backup">The value to return if acceptDefault is true and the input given is invalid</param>
        /// <returns>The numerical input given</returns>
        public static long ReadLong(string prompt = "", bool acceptDefault = false, long backup = 0)
        {
            Console.Write(prompt);
            long input;
            while (true)
            {
                if (long.TryParse(Console.ReadLine(), out input))
                    return input;
                else if (!acceptDefault)
                    Console.WriteLine("Input must be able to be parsed to a double.");
                else
                    return backup;
            }
        }

        /// <summary>
        /// Gets a single numerical input from the user.
        /// </summary>
        /// <param name="prompt">A string to read to the user (Does not use a newline without \n) Default \n</param>
        /// <param name="acceptDefault">If this is true, this will not repeatedly prompt the user, instead returning a default upon an invalid input</param>
        /// <param name="backup">The value to return if acceptDefault is true and the input given is invalid</param>
        /// <returns>The numerical input given</returns>
        public static float ReadFloat(string prompt = "", bool acceptDefault = false, float backup = 0)
        {
            Console.Write(prompt);
            float input;
            while (true)
            {
                if (float.TryParse(Console.ReadLine(), out input))
                    return input;
                else if (!acceptDefault)
                    Console.WriteLine("Input must be able to be parsed to a double.");
                else
                    return backup;
            }
        }

        /// <summary>
        /// Gets a single numerical input from the user.
        /// </summary>
        /// <param name="prompt">A string to read to the user (Does not use a newline without \n) Default \n</param>
        /// <param name="acceptDefault">If this is true, this will not repeatedly prompt the user, instead returning a default upon an invalid input</param>
        /// <param name="backup">The value to return if acceptDefault is true and the input given is invalid</param>
        /// <returns>The numerical input given</returns>
        public static double ReadDouble(string prompt = "", bool acceptDefault = false, double backup = 0)
        {
            Console.Write(prompt);
            double input;
            while (true)
            {
                if (double.TryParse(Console.ReadLine(), out input))
                    return input;
                else if (!acceptDefault)
                    Console.WriteLine("Input must be able to be parsed to a double.");
                else
                    return backup;
            }
        }

        /*
         * OTHER BASIC INPUTS
         * All untested
         */

        /// <summary>
        /// Gets a single character from the user.
        /// </summary>
        /// <param name="prompt">A string to read to the user (Does not use a newline without \n) Default \n</param>
        /// <param name="acceptDefault">If this is true, this will not repeatedly prompt the user, instead returning a default upon an invalid input</param>
        /// <param name="backup">The value to return if acceptDefault is true and the input given is invalid</param>
        /// <returns>The character inputted</returns>
        public static char ReadChar(string prompt = "", bool acceptDefault = false, char backup = '0')
        {
            Console.Write(prompt);
            string userString;
            while (true)
            {
                userString = Console.ReadLine();
                if (userString.Length == 1)
                    return userString[0];
                else if (!acceptDefault)
                    Console.WriteLine("Input must be a single character long.");
                else
                    return backup;
            }
        }

        /// <summary>
        /// Gets a boolean from the user.
        /// </summary>
        /// <param name="prompt">A string to read to the user (Does not use a newline without \n) Default \n</param>
        /// <param name="acceptDefault">If this is true, this will not repeatedly prompt the user, instead returning a default upon an invalid input</param>
        /// <param name="backup">The value to return if acceptDefault is true and the input given is invalid</param>
        /// <returns>The true/false value inputted</returns>
        public static bool ReadBool(string prompt = "", bool acceptDefault = false, bool backup = false)
        {
            Console.Write(prompt);
            string userString;
            while (true)
            {
                userString = Console.ReadLine();
                if (userString.Length>=1)
                {
                    userString = userString.ToLower();
                    if (userString[0] == 't' || userString[0] == 'y')
                    {
                        return true;
                    }
                    else if (userString[0] == 'f' || userString[0] == 'n')
                    {
                        return false;
                    }
                }
                
                if (!acceptDefault)
                    Console.WriteLine("Input must be (t)rue or (f)alse. (y)es or (n)o will also work.");
                else
                    return backup;
            }
        }

        /*
         * LINES OF INPUT
         * Hmm... What would be the best way to approach this?
         * Oh, regular expressions, my old friend.
         * System.Text.RegularExpressions.Regex.IsMatch
         */
        public static bool ValidateInputItem(string item, string regex)
         {
            return System.Text.RegularExpressions.Regex.IsMatch(item, regex);
         }

         /*
          * TRIMMERS
          * Remove unwanted clutter!
          */
         public static string Trim(string toTrim)
         {
            throw (new Exception("This function doesn't work."));
         }

    }

    /// <summary>
    /// For the lazy among us
    /// </summary>
    public enum RegexReference
    {
        //TODO fill this up with commmon regular expressions which might make sense on the competition.
    }
}
