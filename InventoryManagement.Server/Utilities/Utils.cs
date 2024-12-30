namespace InventoryManagement.Server
{
    public static class Utils
    {
        public static string GetNextId(string lastId)
        {
            char[] idArray = lastId.ToCharArray();
            for (int i = idArray.Length - 1; i >= 0; i--) 
            { 
                if (idArray[i] == '9') 
                { 
                    idArray[i] = '0'; 
                } 
                else if (idArray[i] == 'z') 
                { 
                    idArray[i] = 'a'; 
                    break; 
                } 
                else
                { 
                    idArray[i]++; break;
                }
            }
            return new string(idArray);
        }
    }
}
