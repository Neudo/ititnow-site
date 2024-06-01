import HomeAdmin from '@/components/admin/HomeAdmin';
import HomeCustomer from '@/components/admin/HomeCustomer';

interface User {
  id: string;
  email: string;
  name: string;
  nBEvents: number;
  isAdmin: boolean;
  createdAt: string;
}

const ProtectedPage = () => {
import Header from "@/components/admin/Header";




  // useEffect(() => {
  //   const fetchUser = async () => {
  //     console.log('here')
  //     const response = await fetch('/api/auth/getUser');
  //     if (response.status === 401) {
  //       router.push('/login');
  //       return;
  //     }
  //
  //     const data = await response.json();
  //     setUser(data);
  //     setLoading(false);
  //   };
  //
  //   fetchUser();
  // }, [router]);



  return (
      <div>
          <h1>Protected Page</h1>
            <HomeAdmin userData={{name: 'TestName'}} />
      </div>
  );
};

export default ProtectedPage;
