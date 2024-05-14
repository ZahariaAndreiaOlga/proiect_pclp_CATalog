using Newtonsoft.Json;
using proiect_pclp_CATalog.Server.Model;

namespace proiect_pclp_CATalog.Server
{
    public class JsonDatabaseAlt<T>
    {

        private readonly string _pathFile;
        private readonly object _lock = new object();

        public JsonDatabaseAlt(string path)
        {
            this._pathFile = Directory.GetCurrentDirectory() + path;
        }

        public List<T> GetAllObj()
        {
            lock (_lock)
            {
                string jsonData = File.ReadAllText(this._pathFile);
                return JsonConvert.DeserializeObject<List<T>>(jsonData);

            }
        }


        public T GetObjtById(int id)
        {
            lock (_lock)
            {
                List<T> items = GetAllObj();
                return items.FirstOrDefault(item => GetId(item) == id);
            }
        }

        public void PostAll(List<T> items)
        {
            lock (_lock)
            {
                string jsonData = JsonConvert.SerializeObject(items);
                File.WriteAllText(this._pathFile, jsonData);
            }
        }

        public void PostByObjt(T objt)
        {
            lock (_lock)
            {
                List<T> items = GetAllObj();

                if (items.Count > 0)
                {
                    T lastItem = items.Last<T>();
                    int lastItemId = GetId(lastItem);
                    SetId(objt, lastItemId + 1);
                }
                else
                {
                    SetId(objt, 0);
                }

                items.Add(objt);
                PostAll(items);
            }
        }

        public void UpdateObj(T updatedItem, int id)
        {
            lock (_lock)
            {
                List<T> items = GetAllObj();
                T existingItem = items.FirstOrDefault(item => GetId(item) == id);

                if (existingItem != null)
                {
                    SetId(updatedItem, GetId(existingItem));

                    Type type = typeof(T);
                    if (type == typeof(UserModel) && GetPassword(updatedItem) == null)
                    {
                        SetPassword(updatedItem, GetPassword(existingItem));
                    }

                    int index = items.IndexOf(existingItem);
                    items[index] = updatedItem;
                    PostAll(items);
                }
            }
        }

        public void DeleteByObj(int id)
        {
            lock (_lock)
            {
                List<T> items = GetAllObj();
                T existingItem = items.FirstOrDefault(item => GetId(item) == id);

                if (existingItem != null)
                {
                    int index = items.IndexOf(existingItem);
                    items.Remove(items[index]);
                    PostAll(items);
                }
            }
        }

        // User

        public T CheckLoginPass(UserLoginModel user)
        {
            Type type = typeof(T);
            if (type == typeof(UserModel))
            {
                List<T> items = GetAllObj();
                T existingItem = items.FirstOrDefault(item => GetLogin(item) == user.Login);

                if (existingItem != null)
                {
                    if (BCrypt.Net.BCrypt.EnhancedVerify(user.Password, GetPassword(existingItem)))
                    {
                        return existingItem;
                    }
                }
            }

            return default;
        }

        private int GetId(T item)
        {
            var info = typeof(T).GetProperty("Id");
            return (int)info.GetValue(item);
        }

        private void SetId(T item, int value)
        {
            var info = typeof(T).GetProperty("Id");
            info.SetValue(item, value);
        }

        private string GetLogin(T item)
        {
            var info = typeof(T).GetProperty("Login");
            return (string)info.GetValue(item);
        }

        private string GetPassword(T item)
        {
            var info = typeof(T).GetProperty("Password");
            return (string)info.GetValue(item);
        }

        private void SetPassword(T item, string value)
        {
            var info = typeof(T).GetProperty("Password");
            info.SetValue(item, value);
        }

    }
}
