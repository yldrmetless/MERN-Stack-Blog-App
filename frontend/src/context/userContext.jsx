import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;


// İlk olarak, react kütüphanesinden createContext, useEffect ve useState fonksiyonları import ediliyor.

// UserContext adında bir context oluşturuluyor. Bu context, diğer bileşenlerin kullanıcı bilgilerine erişim sağlamasını sağlayacak.

// UserProvider adında bir bileşen oluşturuluyor. Bu bileşen, kullanıcı bilgilerini tutacak bir state ve bu state'i güncellemek için bir fonksiyon içeriyor.

// currentUser adında bir state oluşturuluyor ve localStorage'dan "user" anahtarını kullanarak kullanıcı bilgilerini alıyor. Eğer kullanıcı daha önce kaydedilmişse, bu bilgiler currentUser state'ine atanıyor.

// useEffect hook'u kullanılarak, currentUser state'i değiştiğinde bu bilgilerin localStorage'da güncellenmesi sağlanıyor. Yeni kullanıcı bilgileri localStorage'a JSON formatında kaydediliyor.

// Son olarak, UserContext.Provider bileşeni kullanılarak UserContext'e currentUser state'i ve setCurrentUser fonksiyonu sağlanıyor. Böylece bu context içindeki diğer bileşenler, bu değerlere erişebilir ve bu değerleri güncelleyebilir.

// Bu kodun temel amacı, kullanıcı bilgilerini tutmak ve diğer bileşenlere kolayca erişim sağlamaktır. Ayrıca, bu bilgilerin tarayıcı yerel depolama (localStorage) üzerinde saklanması sağlanarak, kullanıcı oturumu boyunca bilgilerin korunması sağlanır.





