using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SouthSaxon
{

    //I'm adding stuff

    //Adapted from old code, 2016 competition
    /// <summary>
    /// This was originally Java code, and is currently untested.
    /// </summary>
    class BaseConverter
    {
        /// <summary>
        /// Converts a base ten number to a string representation of that number in another base.
        /// Currently only supports up to 16.
        /// I don't pretend to understand StringBuilder
        /// UNTESTED
        /// </summary>
        /// <param name="baseTen">The number to represent</param>
        /// <param name="targetBase">The converted number, in string form./</param>
        /// <returns></returns>
        public static string BaseConvert(int baseTen, int targetBase)
        {
            int input = baseTen;
            StringBuilder outp = new StringBuilder();
            while (input >= targetBase)
            {
                string textRepresentation = (input % targetBase).ToString();
                if (int.Parse(textRepresentation) > 9) //Not necessary if there aren't any letters
                {//Parse it and then put it back together in the format of the new base; useful for letters.
                    int iHold = int.Parse(textRepresentation);
                    textRepresentation = toLetter(iHold); 
                }
                outp.Append(textRepresentation);
                input = input / targetBase;
            }

            string jhold = (input % targetBase).ToString();
            if (int.Parse(jhold) > 9)
            {
                int iHold = int.Parse(jhold);
                jhold = toLetter(iHold);
            }
            outp.Append(input);
            string outpString = outp.ToString();
            string output = "";
            //Lazy fix since there's no StringBuilder.Append() in C#
            for(int i = outpString.Length - 1; i <= 0; i --)
            {
                output += outpString[i];
            }
            return outpString;
        }

        //------------------------------------------------------------------------------------

        //only converts up to base 16, to add more, simply add more case statements.
        //for example...
        //	case 16:
        //		s = "G";
        //	break;
        //	case 17:
        //		s = "H";
        //	break;
        //	....

        /// <summary>
        /// Converts digits from 11 to 16 into A - F
        /// UNTESTED
        /// </summary>
        /// <param name="i">The number to convert</param>
        /// <returns>A string A-F; Will become "X" if not 11-16</returns>
        public static string toLetter(int i)
        {
            string s = "";
            switch (i)
            {

                case 10:
                    s = "A";
                    break;

                case 11:
                    s = "B";
                    break;

                case 12:
                    s = "C";
                    break;

                case 13:
                    s = "D";
                    break;
                case 14:
                    s = "E";
                    break;
                case 15:
                    s = "F";
                    break;
                default:
                    s = "X";
                    break;

            }
            return s;
        }
    }
}
