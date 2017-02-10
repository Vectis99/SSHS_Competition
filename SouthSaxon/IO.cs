using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
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
         * OTHER
         */

        /// <summary>
        /// Removes unwanted characters from a string.
        /// string.Replace() isn't used because you can't replace things without leaving an empty space in the string
        /// </summary>
        /// <param name="toTrim">The string to remove characters from</param>
        /// <param name="blacklist">A string containing an instance of every character to remove</param>
        /// <returns>A string without any of the blacklisted characters</returns>
        public static string Trim(string toTrim, string blacklist)
         {
            string trimmed = ""; 
            foreach(char c in toTrim)
            {
                foreach(char k in blacklist)
                {
                    if (c != k)
                        trimmed += c;
                }
            }
            return trimmed;
         }

        /// <summary>
        /// Tests a string against a regular expression.
        /// </summary>
        /// <seealso cref="RegexReference"/>
        /// <param name="input">The string to inspect</param>
        /// <param name="expression">The regular expression by which to evaluate the string</param>
        /// <param name="matchAmountMin">The minimum number of matches to accept (optional)</param>
        /// <param name="matchAmountMax">The maximum number of matches to accept (optional)</param>
        /// <returns></returns>
        public static bool TestExpression(string input, string expression, int matchAmountMin = -1, int matchAmountMax = -1)
        {
            Regex expressionToTest = new Regex(expression);
            MatchCollection matches = expressionToTest.Matches(input);
            int numberOfMatches = matches.Count;
            if((matchAmountMin < 0|| matchAmountMax < 0) && numberOfMatches > 0)
            {
                return true;
            }
            else if ( numberOfMatches >= matchAmountMin && numberOfMatches <= matchAmountMax) //Yeah they're inclusive
            {
                return true;
            }
            return false;
        }

    }

    /// <summary>
    /// For the lazy among us
    /// </summary>
    public static class RegexReference
    {
        //TODO fill this up with commmon regular expressions which might make sense on the competition.
        // All \ charactars will be replaced by \\ because of escaping.
        public static string LETTERS = "([A-Z]|[a-z])+";
        public static string NUMBERS = "([0-9]*\\.[0-9]+)|([0-9]+)";
        public static string INTEGER = "[0-9]+";
        public static string HEX = "#?((([a,A,b,B,c,C,d,D,e,E,f,F]|[0-9])*\\.([a,A,b,B,c,C,d,D,e,E,f,F]|[0-9])+)|([a,A,b,B,c,C,d,D,e,E,f,F]|[0-9])+)"; //This is a horrible regular expression, but it works. You can condense it if you want.
        public static string BINARY = "[1,0]+";
        public static string MATH_OPERATOR_SIMPLE = "[+,\\-,*,/,(,)]";
        public static string MATH_OPERATOR_ALL = "[+,\\-,*,/,(,),^,%]";
        public static string MATH_OPERATION = "([+,\\-,*,/,(,),^,%]|([0-9]*\\.[0-9]+)|([0-9]+))+";
        public static string PRECURSOR_TOKEN = "([A-Z]|[a-z]){1}[0-9]+";
        public static string POSTCURSOR_TOKEN = "[0-9]+([A-Z]|[a-z]){1}"; //I don't think postcursor is a word but don't tell anyone.
    }
}
