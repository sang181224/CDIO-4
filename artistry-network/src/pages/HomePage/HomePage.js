import Banner from '../../components/Banner/Banner';
import PostCard from '../../components/PostCard/PostCard';
import Slider from '../../components/Slider/Slider';
import './HomePage.css';
import '../../components/Button/button.css';
const dummyArtWorks = [
    {
        id: 1, title: 'Tác phẩm Mẫu 1', postTime: '16/09/2005',
        description: 'Một tác phẩm nghệ thuật đương đại với những đường nét táo bạo, thể hiện cảm xúc sâu sắc...',
        price: '1,500,000 VNĐ',
        imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cfdd8d93-55a1-4533-992c-6ce766867e07/dk7c8bl-2398e43a-e80d-4aba-ba08-fc98ee6bb375.png/v1/fill/w_1190,h_672,q_70,strp/beneath_the_mist__a_secret_by_linaewendreams_dk7c8bl-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4NCIsInBhdGgiOiIvZi9jZmRkOGQ5My01NWExLTQ1MzMtOTkyYy02Y2U3NjY4NjdlMDcvZGs3YzhibC0yMzk4ZTQzYS1lODBkLTRhYmEtYmEwOC1mYzk4ZWU2YmIzNzUucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ZW4wGgSORVY1U0hwn8Be8WCS-9P6EUhEBW0MYJWZDUY',
        author: { name: 'Nghệ sĩ A', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' }
    },
    {
        id: 2, title: 'Tác phẩm Mẫu 2', price: '2,800,000 VNĐ', postTime: '17/09/2005',
        description: 'Một tác phẩm nghệ thuật đương đại với những đường nét táo bạo, thể hiện cảm xúc sâu sắc...',
        imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cfdd8d93-55a1-4533-992c-6ce766867e07/dk86sxh-c1fdb3a8-4e94-4267-9bb3-4f10f8c4fa26.png/v1/fill/w_1190,h_672,q_70,strp/_before_the_silence_fades_by_linaewendreams_dk86sxh-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4NCIsInBhdGgiOiIvZi9jZmRkOGQ5My01NWExLTQ1MzMtOTkyYy02Y2U3NjY4NjdlMDcvZGs4NnN4aC1jMWZkYjNhOC00ZTk0LTQyNjctOWJiMy00ZjEwZjhjNGZhMjYucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.usWy9oxfc2DuX0myc1lJVO1wMgsLiA_Pm9X1DIrIXeg',
        author: { name: 'Nghệ sĩ B', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' }
    },
    {
        id: 3, title: 'Tác phẩm Mẫu 3', price: '950,000 VNĐ', postTime: '18/09/2005',
        description: 'Một tác phẩm nghệ thuật đương đại với những đường nét táo bạo, thể hiện cảm xúc sâu sắc...',
        imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cfdd8d93-55a1-4533-992c-6ce766867e07/dk54bj4-e96eba4e-5c61-47c0-9695-99dcbdcf3b7b.png/v1/fill/w_1190,h_672,q_70,strp/the_shape_of_what_remains_by_linaewendreams_dk54bj4-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4NCIsInBhdGgiOiIvZi9jZmRkOGQ5My01NWExLTQ1MzMtOTkyYy02Y2U3NjY4NjdlMDcvZGs1NGJqNC1lOTZlYmE0ZS01YzYxLTQ3YzAtOTY5NS05OWRjYmRjZjNiN2IucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.5grn6yvD8R7JY12cXLjLo8RcxSukRD1o_-h9MwZe7Eg',
        author: { name: 'Nghệ sĩ C', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' }
    }, {
        id: 4, title: 'Tác phẩm Mẫu 4', postTime: '16/09/2005',
        description: 'Một tác phẩm nghệ thuật đương đại với những đường nét táo bạo, thể hiện cảm xúc sâu sắc...',
        price: '1,500,000 VNĐ',
        imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cfdd8d93-55a1-4533-992c-6ce766867e07/dk7c8bl-2398e43a-e80d-4aba-ba08-fc98ee6bb375.png/v1/fill/w_1190,h_672,q_70,strp/beneath_the_mist__a_secret_by_linaewendreams_dk7c8bl-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4NCIsInBhdGgiOiIvZi9jZmRkOGQ5My01NWExLTQ1MzMtOTkyYy02Y2U3NjY4NjdlMDcvZGs3YzhibC0yMzk4ZTQzYS1lODBkLTRhYmEtYmEwOC1mYzk4ZWU2YmIzNzUucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ZW4wGgSORVY1U0hwn8Be8WCS-9P6EUhEBW0MYJWZDUY',
        author: { name: 'Nghệ sĩ A', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' }
    },
    {
        id: 5, title: 'Tác phẩm Mẫu 5', price: '2,800,000 VNĐ', postTime: '17/09/2005',
        description: 'Một tác phẩm nghệ thuật đương đại với những đường nét táo bạo, thể hiện cảm xúc sâu sắc...',
        imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dkf3mgw-9e5a048a-5920-4b3d-ba20-1283e680a0e7.png/v1/fill/w_1072,h_745,q_70,strp/spirit_of_the_mountain_cat_by_odysseyorigins_dkf3mgw-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTQvZGtmM21ndy05ZTVhMDQ4YS01OTIwLTRiM2QtYmEyMC0xMjgzZTY4MGEwZTcucG5nIiwiaGVpZ2h0IjoiPD04OTAiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiIvd20vZDcwMzk3YjEtM2MyMS00MTUwLTliNWUtNDE1OWMyNjQ4NmE0L29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.VuihF2qCzUluq80kWj2KDfZkGqd4QaFQ9tLsCC7qxrA',
        author: { name: 'Nghệ sĩ B', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' }
    },
    {
        id: 6, title: 'Tác phẩm Mẫu 6', price: '950,000 VNĐ', postTime: '18/09/2005',
        description: 'Một tác phẩm nghệ thuật đương đại với những đường nét táo bạo, thể hiện cảm xúc sâu sắc...',
        imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dkc9zba-25918916-a709-4157-9204-c586d755a433.png/v1/fill/w_1072,h_745,q_70,strp/indiana_girl_with_giant_lynx_by_odysseyorigins_dkc9zba-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTQvZGtjOXpiYS0yNTkxODkxNi1hNzA5LTQxNTctOTIwNC1jNTg2ZDc1NWE0MzMucG5nIiwiaGVpZ2h0IjoiPD04OTAiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiIvd20vZDcwMzk3YjEtM2MyMS00MTUwLTliNWUtNDE1OWMyNjQ4NmE0L29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.9fSQhW5blcLgSsG7WbfTQngzkB9XzcX4Bj-i_I3AGIw',
        author: { name: 'Nghệ sĩ C', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' }
    },
    {
        id: 7, title: 'Tác phẩm Mẫu 7', postTime: '16/09/2005',
        description: 'Một tác phẩm nghệ thuật đương đại với những đường nét táo bạo, thể hiện cảm xúc sâu sắc...',
        price: '1,500,000 VNĐ',
        imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dhlujuf-726eb02d-e99b-47ce-ac26-8b91a2b3afa4.png/v1/fill/w_1194,h_669,q_70,strp/ethereal_strength__song_dynasty_beauty_and_wolf_by_odysseyorigins_dhlujuf-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTQvZGhsdWp1Zi03MjZlYjAyZC1lOTliLTQ3Y2UtYWMyNi04YjkxYTJiM2FmYTQucG5nIiwiaGVpZ2h0IjoiPD03MTgiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiIvd20vZDcwMzk3YjEtM2MyMS00MTUwLTliNWUtNDE1OWMyNjQ4NmE0L29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.MqncYOGAHDkN2134vUlvr6nO6sRbuTHK8a_wshHQ1pU',
        author: { name: 'Nghệ sĩ A', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' }
    },
    {
        id: 8, title: 'Tác phẩm Mẫu 8', price: '2,800,000 VNĐ', postTime: '17/09/2005',
        description: 'Một tác phẩm nghệ thuật đương đại với những đường nét táo bạo, thể hiện cảm xúc sâu sắc...',
        imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dgbfs35-20893bef-beb2-44c5-b944-1b1308de7b85.png/v1/fill/w_1024,h_574,q_80,strp/azure_lumina__tiger_s_keeper_by_odysseyorigins_dgbfs35-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTQvZGdiZnMzNS0yMDg5M2JlZi1iZWIyLTQ0YzUtYjk0NC0xYjEzMDhkZTdiODUucG5nIiwiaGVpZ2h0IjoiPD01NzQiLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiIvd20vZDcwMzk3YjEtM2MyMS00MTUwLTliNWUtNDE1OWMyNjQ4NmE0L29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.awp6_kdELUB-7eQhwER3l2pHUpVQnsXe22L2lt-KtLI',
        author: { name: 'Nghệ sĩ B', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' }
    },
    {
        id: 9, title: 'Tác phẩm Mẫu 9', price: '950,000 VNĐ', postTime: '18/09/2005',
        description: 'Một tác phẩm nghệ thuật đương đại với những đường nét táo bạo, thể hiện cảm xúc sâu sắc...',
        imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dgbfs30-3ca52e68-9c0d-437a-8af7-2264784195ce.png/v1/fill/w_1024,h_574,q_80,strp/tiger_s_embrace__azure_night_by_odysseyorigins_dgbfs30-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTQvZGdiZnMzMC0zY2E1MmU2OC05YzBkLTQzN2EtOGFmNy0yMjY0Nzg0MTk1Y2UucG5nIiwiaGVpZ2h0IjoiPD01NzQiLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiIvd20vZDcwMzk3YjEtM2MyMS00MTUwLTliNWUtNDE1OWMyNjQ4NmE0L29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.QgXulVfwVMsB3N93stRxBNuvr0-FblFB5_WKj5Eqt_c',
        author: { name: 'Nghệ sĩ C', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' }
    }, {
        id: 10, title: 'Tác phẩm Mẫu 10', postTime: '16/09/2005',
        description: 'Một tác phẩm nghệ thuật đương đại với những đường nét táo bạo, thể hiện cảm xúc sâu sắc...',
        price: '1,500,000 VNĐ',
        imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dfyqkc5-9bd4938f-7309-4842-893e-8229a60cc276.png/v1/fill/w_1024,h_574,q_80,strp/icebound_monarch__a_tiger_s_arctic_dance_by_odysseyorigins_dfyqkc5-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTQvZGZ5cWtjNS05YmQ0OTM4Zi03MzA5LTQ4NDItODkzZS04MjI5YTYwY2MyNzYucG5nIiwiaGVpZ2h0IjoiPD01NzQiLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiIvd20vZDcwMzk3YjEtM2MyMS00MTUwLTliNWUtNDE1OWMyNjQ4NmE0L29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.Fr60eLCt_ztdAb5exW5GVUyR5DbVdUIFC-uvwYtcwnY',
        author: { name: 'Nghệ sĩ A', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' }
    },
    {
        id: 11, title: 'Tác phẩm Mẫu 11', price: '2,800,000 VNĐ', postTime: '17/09/2005',
        description: 'Một tác phẩm nghệ thuật đương đại với những đường nét táo bạo, thể hiện cảm xúc sâu sắc...',
        imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d70397b1-3c21-4150-9b5e-4159c26486a4/dka3u8r-c55dc436-ff6d-4efa-85d9-f57cce49fdd7.png/v1/fill/w_1194,h_669,q_70,strp/mystic_white_tiger_in_dreamy_forest_glow_by_odysseyorigins_dka3u8r-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi9kNzAzOTdiMS0zYzIxLTQxNTAtOWI1ZS00MTU5YzI2NDg2YTQvZGthM3U4ci1jNTVkYzQzNi1mZjZkLTRlZmEtODVkOS1mNTdjY2U0OWZkZDcucG5nIiwiaGVpZ2h0IjoiPD03MTgiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiIvd20vZDcwMzk3YjEtM2MyMS00MTUwLTliNWUtNDE1OWMyNjQ4NmE0L29keXNzZXlvcmlnaW5zLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.cJASeVckAcc2PuIE4kycTz1_UbSR9kkGmMzjR5VGbxc',
        author: { name: 'Nghệ sĩ B', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' }
    },
    {
        id: 12, title: 'Tác phẩm Mẫu 12', price: '950,000 VNĐ', postTime: '18/09/2005',
        description: 'Một tác phẩm nghệ thuật đương đại với những đường nét táo bạo, thể hiện cảm xúc sâu sắc...',
        imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cfdd8d93-55a1-4533-992c-6ce766867e07/dk54bj4-e96eba4e-5c61-47c0-9695-99dcbdcf3b7b.png/v1/fill/w_1190,h_672,q_70,strp/the_shape_of_what_remains_by_linaewendreams_dk54bj4-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4NCIsInBhdGgiOiIvZi9jZmRkOGQ5My01NWExLTQ1MzMtOTkyYy02Y2U3NjY4NjdlMDcvZGs1NGJqNC1lOTZlYmE0ZS01YzYxLTQ3YzAtOTY5NS05OWRjYmRjZjNiN2IucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.5grn6yvD8R7JY12cXLjLo8RcxSukRD1o_-h9MwZe7Eg',
        author: { name: 'Nghệ sĩ C', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' }
    },
];
function HomePage() {
    const renderPostCard = () => {
        if (dummyArtWorks.length > 0) {
            return dummyArtWorks.map(value => {
                return <PostCard key={value.id} artwork={value} />
            })
        }
    }
    return (
        <>
            {<Banner />}
            <main className="homepage-content">
                <section className="home-section featured-artworks">
                    <div className="home-section-container">
                        <div className="home-section-header">
                            <h2 className="home-section-title">Tác phẩm Nổi bật</h2>
                            <a href="shop.html" className="btn-view-all">Xem tất cả →</a>
                        </div>
                        {/* <div className="slider-container">
                            <div className="horizontal-slider">
                                {renderPostCard()}
                            </div>
                            <div className="slider-dots" />
                        </div> */}
                        <Slider>
                            {renderPostCard()}
                        </Slider>
                    </div>
                </section>
                <section className="home-section category-showcase">
                    <div className="home-section-container">
                        <h2 className="home-section-title">Khám phá theo Thể loại</h2>
                        <div className="category-grid">
                            <a href="shop.html?category=hoaihoa" className="category-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1536924430914-94f3302a50a5?q=80&w=2070&auto=format&fit=crop")' }}>
                                <h3>Hội họa</h3>
                            </a>
                            <a href="shop.html?category=dieukhac" className="category-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1620050811233-586455a73229?q=80&w=1974&auto=format&fit=crop")' }}>
                                <h3>Điêu khắc</h3>
                            </a>
                            <a href="shop.html?category=nhiepanh" className="category-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1505238680356-6678fb750953?q=80&w=1994&auto=format&fit=crop")' }}>
                                <h3>Nhiếp ảnh</h3>
                            </a>
                            <a href="shop.html?category=digital" className="category-card" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop")' }}>
                                <h3>Kỹ thuật số</h3>
                            </a>
                        </div>
                    </div>
                </section>
                <section className="home-section artist-spotlight">
                    <div className="home-section-container">
                        <h2 className="home-section-title">Nghệ sĩ Tiêu biểu</h2>
                        <div className="horizontal-slider">
                            <a href="profile.html" className="artist-card">
                                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" alt="Avatar Nghệ sĩ" />
                                <h4>Elena Rodriguez</h4>
                            </a>
                            <a href="profile.html" className="artist-card">
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop" alt="Avatar Nghệ sĩ" />
                                <h4>Kenji Watanabe</h4>
                            </a>
                            <a href="profile.html" className="artist-card">
                                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop" alt="Avatar Nghệ sĩ" />
                                <h4>Marcus Cole</h4>
                            </a>
                        </div>
                    </div>
                </section>
                <section className="home-section cta-section">
                    <div className="home-section-container cta-content">
                        <h2>Trở thành một phần của ArtistryNetwork</h2>
                        <p>Tham gia cộng đồng, chia sẻ tác phẩm và kết nối với những người yêu nghệ thuật trên khắp thế giới.
                        </p>
                        <div className="cta-buttons">
                            <a href="register.html" className="btn btn-primary">Đăng ký ngay</a>
                            <a href="upload.html" className="btn btn-secondary">Đăng tải Tác phẩm</a>
                        </div>
                    </div>
                </section>
                <section className="home-section latest-artworks">
                    <div className="home-section-container">
                        <div className="home-section-header">
                            <h2 className="home-section-title">Tác phẩm Mới nhất</h2>
                            <a href="shop.html" className="btn-view-all">Xem tất cả →</a>
                        </div>
                        <div className="slider-container">
                            <div className="horizontal-slider">
                                <article className="post-card">
                                    <div className="card-edit-button">
                                        <a href="/edit-artwork.html">✏️ Chỉnh sửa</a>
                                    </div>
                                    <a href="/product-detail.html" className="post-image-link">
                                        <div className="post-image">
                                            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cfdd8d93-55a1-4533-992c-6ce766867e07/dk7c8bl-2398e43a-e80d-4aba-ba08-fc98ee6bb375.png/v1/fill/w_1190,h_672,q_70,strp/beneath_the_mist__a_secret_by_linaewendreams_dk7c8bl-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4NCIsInBhdGgiOiIvZi9jZmRkOGQ5My01NWExLTQ1MzMtOTkyYy02Y2U3NjY4NjdlMDcvZGs3YzhibC0yMzk4ZTQzYS1lODBkLTRhYmEtYmEwOC1mYzk4ZWU2YmIzNzUucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ZW4wGgSORVY1U0hwn8Be8WCS-9P6EUhEBW0MYJWZDUY" alt="Tên tác phẩm" />
                                        </div>
                                    </a>
                                    <div className="post-card-content">
                                        <div className="post-author">
                                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" alt="Avatar Nghệ sĩ" />
                                            <div className="author-details">
                                                <h4>Tên nghệ sĩ</h4>
                                                <p>Thời gian đăng</p>
                                            </div>
                                        </div>
                                        <a href="/product-detail.html" className="post-title-link">
                                            <h3>Tên tác phẩm</h3>
                                        </a>
                                        <p className="post-description">Một tác phẩm nghệ thuật đương đại với những đường nét táo
                                            bạo, thể hiện cảm xúc sâu sắc...</p>
                                        <div className="price">3,500,000 VNĐ</div>
                                    </div>
                                    <div className="post-actions">
                                        <button className="action-button like-button">
                                            <i className="fa-regular fa-thumbs-up" />
                                            <span>Thích</span>
                                            <div className="reaction-popup">
                                                <i className="fa-solid fa-thumbs-up reaction-icon" data-reaction="like" title="Thích" />
                                                <i className="fa-solid fa-heart reaction-icon" data-reaction="love" title="Yêu thích" />
                                                <i className="fa-solid fa-face-laugh-squint reaction-icon" data-reaction="haha" title="Haha" />
                                                <i className="fa-solid fa-face-surprise reaction-icon" data-reaction="wow" title="Wow" />
                                                <i className="fa-solid fa-face-sad-tear reaction-icon" data-reaction="sad" title="Buồn" />
                                                <i className="fa-solid fa-face-angry reaction-icon" data-reaction="angry" title="Phẫn nộ" />
                                            </div>
                                        </button>
                                        <a className="action-button" href="/product-detail.html">
                                            <i className="fa-regular fa-comment" />
                                            <span>Bình luận</span>
                                        </a>
                                        <button className="action-button">
                                            <i className="fa-solid fa-share" />
                                            <span>Chia sẻ</span>
                                        </button>
                                    </div>
                                </article>
                                <article className="post-card">
                                    <div className="card-edit-button">
                                        <a href="/edit-artwork.html">✏️ Chỉnh sửa</a>
                                    </div>
                                    <a href="/product-detail.html" className="post-image-link">
                                        <div className="post-image">
                                            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cfdd8d93-55a1-4533-992c-6ce766867e07/dk86sxh-c1fdb3a8-4e94-4267-9bb3-4f10f8c4fa26.png/v1/fill/w_1190,h_672,q_70,strp/_before_the_silence_fades_by_linaewendreams_dk86sxh-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4NCIsInBhdGgiOiIvZi9jZmRkOGQ5My01NWExLTQ1MzMtOTkyYy02Y2U3NjY4NjdlMDcvZGs4NnN4aC1jMWZkYjNhOC00ZTk0LTQyNjctOWJiMy00ZjEwZjhjNGZhMjYucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.usWy9oxfc2DuX0myc1lJVO1wMgsLiA_Pm9X1DIrIXeg" alt="Tên tác phẩm" />
                                        </div>
                                    </a>
                                    <div className="post-card-content">
                                        <div className="post-author">
                                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" alt="Avatar Nghệ sĩ" />
                                            <div className="author-details">
                                                <h4>Tên nghệ sĩ</h4>
                                                <p>Thời gian đăng</p>
                                            </div>
                                        </div>
                                        <a href="/product-detail.html" className="post-title-link">
                                            <h3>Tên tác phẩm</h3>
                                        </a>
                                        <p className="post-description">Một tác phẩm nghệ thuật đương đại với những đường nét táo
                                            bạo, thể hiện cảm xúc sâu sắc...</p>
                                        <div className="price">3,500,000 VNĐ</div>
                                    </div>
                                    <div className="post-actions">
                                        <button className="action-button like-button">
                                            <i className="fa-regular fa-thumbs-up" />
                                            <span>Thích</span>
                                            <div className="reaction-popup">
                                                <i className="fa-solid fa-thumbs-up reaction-icon" data-reaction="like" title="Thích" />
                                                <i className="fa-solid fa-heart reaction-icon" data-reaction="love" title="Yêu thích" />
                                                <i className="fa-solid fa-face-laugh-squint reaction-icon" data-reaction="haha" title="Haha" />
                                                <i className="fa-solid fa-face-surprise reaction-icon" data-reaction="wow" title="Wow" />
                                                <i className="fa-solid fa-face-sad-tear reaction-icon" data-reaction="sad" title="Buồn" />
                                                <i className="fa-solid fa-face-angry reaction-icon" data-reaction="angry" title="Phẫn nộ" />
                                            </div>
                                        </button>
                                        <a className="action-button" href="/product-detail.html">
                                            <i className="fa-regular fa-comment" />
                                            <span>Bình luận</span>
                                        </a>
                                        <button className="action-button">
                                            <i className="fa-solid fa-share" />
                                            <span>Chia sẻ</span>
                                        </button>
                                    </div>
                                </article>
                                <article className="post-card">
                                    <div className="card-edit-button">
                                        <a href="/edit-artwork.html">✏️ Chỉnh sửa</a>
                                    </div>
                                    <a href="/product-detail.html" className="post-image-link">
                                        <div className="post-image">
                                            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cfdd8d93-55a1-4533-992c-6ce766867e07/dk54bj4-e96eba4e-5c61-47c0-9695-99dcbdcf3b7b.png/v1/fill/w_1190,h_672,q_70,strp/the_shape_of_what_remains_by_linaewendreams_dk54bj4-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4NCIsInBhdGgiOiIvZi9jZmRkOGQ5My01NWExLTQ1MzMtOTkyYy02Y2U3NjY4NjdlMDcvZGs1NGJqNC1lOTZlYmE0ZS01YzYxLTQ3YzAtOTY5NS05OWRjYmRjZjNiN2IucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.5grn6yvD8R7JY12cXLjLo8RcxSukRD1o_-h9MwZe7Eg" alt="Tên tác phẩm" />
                                        </div>
                                    </a>
                                    <div className="post-card-content">
                                        <div className="post-author">
                                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" alt="Avatar Nghệ sĩ" />
                                            <div className="author-details">
                                                <h4>Tên nghệ sĩ</h4>
                                                <p>Thời gian đăng</p>
                                            </div>
                                        </div>
                                        <a href="/product-detail.html" className="post-title-link">
                                            <h3>Tên tác phẩm</h3>
                                        </a>
                                        <p className="post-description">Một tác phẩm nghệ thuật đương đại với những đường nét táo
                                            bạo, thể hiện cảm xúc sâu sắc...</p>
                                        <div className="price">3,500,000 VNĐ</div>
                                    </div>
                                    <div className="post-actions">
                                        <button className="action-button like-button">
                                            <i className="fa-regular fa-thumbs-up" />
                                            <span>Thích</span>
                                            <div className="reaction-popup">
                                                <i className="fa-solid fa-thumbs-up reaction-icon" data-reaction="like" title="Thích" />
                                                <i className="fa-solid fa-heart reaction-icon" data-reaction="love" title="Yêu thích" />
                                                <i className="fa-solid fa-face-laugh-squint reaction-icon" data-reaction="haha" title="Haha" />
                                                <i className="fa-solid fa-face-surprise reaction-icon" data-reaction="wow" title="Wow" />
                                                <i className="fa-solid fa-face-sad-tear reaction-icon" data-reaction="sad" title="Buồn" />
                                                <i className="fa-solid fa-face-angry reaction-icon" data-reaction="angry" title="Phẫn nộ" />
                                            </div>
                                        </button>
                                        <a className="action-button" href="/product-detail.html">
                                            <i className="fa-regular fa-comment" />
                                            <span>Bình luận</span>
                                        </a>
                                        <button className="action-button">
                                            <i className="fa-solid fa-share" />
                                            <span>Chia sẻ</span>
                                        </button>
                                    </div>
                                </article>
                                <article className="post-card">
                                    <div className="card-edit-button">
                                        <a href="/edit-artwork.html">✏️ Chỉnh sửa</a>
                                    </div>
                                    <a href="/product-detail.html" className="post-image-link">
                                        <div className="post-image">
                                            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cfdd8d93-55a1-4533-992c-6ce766867e07/dk8g1ac-a3c6b469-98c2-4a9f-bc3e-d625c8a58a86.png/v1/fill/w_1197,h_668,q_70,strp/no_one_saw_him_leave_by_linaewendreams_dk8g1ac-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA3MSIsInBhdGgiOiIvZi9jZmRkOGQ5My01NWExLTQ1MzMtOTkyYy02Y2U3NjY4NjdlMDcvZGs4ZzFhYy1hM2M2YjQ2OS05OGMyLTRhOWYtYmMzZS1kNjI1YzhhNThhODYucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.x4PZl8uKVZL-xR7LbThDaFUNhRflm9Uc1LCre3GB0yQ" alt="Tên tác phẩm" />
                                        </div>
                                    </a>
                                    <div className="post-card-content">
                                        <div className="post-author">
                                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" alt="Avatar Nghệ sĩ" />
                                            <div className="author-details">
                                                <h4>Tên nghệ sĩ</h4>
                                                <p>Thời gian đăng</p>
                                            </div>
                                        </div>
                                        <a href="/product-detail.html" className="post-title-link">
                                            <h3>Tên tác phẩm</h3>
                                        </a>
                                        <p className="post-description">Một tác phẩm nghệ thuật đương đại với những đường nét táo
                                            bạo, thể hiện cảm xúc sâu sắc...</p>
                                        <div className="price">3,500,000 VNĐ</div>
                                    </div>
                                    <div className="post-actions">
                                        <button className="action-button like-button">
                                            <i className="fa-regular fa-thumbs-up" />
                                            <span>Thích</span>
                                            <div className="reaction-popup">
                                                <i className="fa-solid fa-thumbs-up reaction-icon" data-reaction="like" title="Thích" />
                                                <i className="fa-solid fa-heart reaction-icon" data-reaction="love" title="Yêu thích" />
                                                <i className="fa-solid fa-face-laugh-squint reaction-icon" data-reaction="haha" title="Haha" />
                                                <i className="fa-solid fa-face-surprise reaction-icon" data-reaction="wow" title="Wow" />
                                                <i className="fa-solid fa-face-sad-tear reaction-icon" data-reaction="sad" title="Buồn" />
                                                <i className="fa-solid fa-face-angry reaction-icon" data-reaction="angry" title="Phẫn nộ" />
                                            </div>
                                        </button>
                                        <a className="action-button" href="/product-detail.html">
                                            <i className="fa-regular fa-comment" />
                                            <span>Bình luận</span>
                                        </a>
                                        <button className="action-button">
                                            <i className="fa-solid fa-share" />
                                            <span>Chia sẻ</span>
                                        </button>
                                    </div>
                                </article>
                                <article className="post-card">
                                    <div className="card-edit-button">
                                        <a href="/edit-artwork.html">✏️ Chỉnh sửa</a>
                                    </div>
                                    <a href="/product-detail.html" className="post-image-link">
                                        <div className="post-image">
                                            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cfdd8d93-55a1-4533-992c-6ce766867e07/dkcntyq-f7764514-f35f-4bf8-9d44-35dd432be8f8.png/v1/fill/w_1190,h_672,q_70,strp/_sea_at_the_end_of_the_tracks_by_linaewendreams_dkcntyq-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4NCIsInBhdGgiOiIvZi9jZmRkOGQ5My01NWExLTQ1MzMtOTkyYy02Y2U3NjY4NjdlMDcvZGtjbnR5cS1mNzc2NDUxNC1mMzVmLTRiZjgtOWQ0NC0zNWRkNDMyYmU4ZjgucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.EgTm4GH5SNsWd0Q9NDp_zjLM0tq-WcNL8C_shDcB9RM" alt="Tên tác phẩm" />
                                        </div>
                                    </a>
                                    <div className="post-card-content">
                                        <div className="post-author">
                                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" alt="Avatar Nghệ sĩ" />
                                            <div className="author-details">
                                                <h4>Tên nghệ sĩ</h4>
                                                <p>Thời gian đăng</p>
                                            </div>
                                        </div>
                                        <a href="/product-detail.html" className="post-title-link">
                                            <h3>Tên tác phẩm</h3>
                                        </a>
                                        <p className="post-description">Một tác phẩm nghệ thuật đương đại với những đường nét táo
                                            bạo, thể hiện cảm xúc sâu sắc...</p>
                                        <div className="price">3,500,000 VNĐ</div>
                                    </div>
                                    <div className="post-actions">
                                        <button className="action-button like-button">
                                            <i className="fa-regular fa-thumbs-up" />
                                            <span>Thích</span>
                                            <div className="reaction-popup">
                                                <i className="fa-solid fa-thumbs-up reaction-icon" data-reaction="like" title="Thích" />
                                                <i className="fa-solid fa-heart reaction-icon" data-reaction="love" title="Yêu thích" />
                                                <i className="fa-solid fa-face-laugh-squint reaction-icon" data-reaction="haha" title="Haha" />
                                                <i className="fa-solid fa-face-surprise reaction-icon" data-reaction="wow" title="Wow" />
                                                <i className="fa-solid fa-face-sad-tear reaction-icon" data-reaction="sad" title="Buồn" />
                                                <i className="fa-solid fa-face-angry reaction-icon" data-reaction="angry" title="Phẫn nộ" />
                                            </div>
                                        </button>
                                        <a className="action-button" href="/product-detail.html">
                                            <i className="fa-regular fa-comment" />
                                            <span>Bình luận</span>
                                        </a>
                                        <button className="action-button">
                                            <i className="fa-solid fa-share" />
                                            <span>Chia sẻ</span>
                                        </button>
                                    </div>
                                </article>
                                <article className="post-card">
                                    <div className="card-edit-button">
                                        <a href="/edit-artwork.html">✏️ Chỉnh sửa</a>
                                    </div>
                                    <a href="/product-detail.html" className="post-image-link">
                                        <div className="post-image">
                                            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cfdd8d93-55a1-4533-992c-6ce766867e07/dkbfjp0-3385d6dc-e628-4990-8a5d-3e8e14ae1f05.png/v1/fill/w_1190,h_672,q_70,strp/_the_last_platform_by_linaewendreams_dkbfjp0-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4NCIsInBhdGgiOiIvZi9jZmRkOGQ5My01NWExLTQ1MzMtOTkyYy02Y2U3NjY4NjdlMDcvZGtiZmpwMC0zMzg1ZDZkYy1lNjI4LTQ5OTAtOGE1ZC0zZThlMTRhZTFmMDUucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.jujOkvU6KCwfrUnMhqC7j1C6ct92DuDykcaAZLU4jOA" alt="Tên tác phẩm" />
                                        </div>
                                    </a>
                                    <div className="post-card-content">
                                        <div className="post-author">
                                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" alt="Avatar Nghệ sĩ" />
                                            <div className="author-details">
                                                <h4>Tên nghệ sĩ</h4>
                                                <p>Thời gian đăng</p>
                                            </div>
                                        </div>
                                        <a href="/product-detail.html" className="post-title-link">
                                            <h3>Tên tác phẩm</h3>
                                        </a>
                                        <p className="post-description">Một tác phẩm nghệ thuật đương đại với những đường nét táo
                                            bạo, thể hiện cảm xúc sâu sắc...</p>
                                        <div className="price">3,500,000 VNĐ</div>
                                    </div>
                                    <div className="post-actions">
                                        <button className="action-button like-button">
                                            <i className="fa-regular fa-thumbs-up" />
                                            <span>Thích</span>
                                            <div className="reaction-popup">
                                                <i className="fa-solid fa-thumbs-up reaction-icon" data-reaction="like" title="Thích" />
                                                <i className="fa-solid fa-heart reaction-icon" data-reaction="love" title="Yêu thích" />
                                                <i className="fa-solid fa-face-laugh-squint reaction-icon" data-reaction="haha" title="Haha" />
                                                <i className="fa-solid fa-face-surprise reaction-icon" data-reaction="wow" title="Wow" />
                                                <i className="fa-solid fa-face-sad-tear reaction-icon" data-reaction="sad" title="Buồn" />
                                                <i className="fa-solid fa-face-angry reaction-icon" data-reaction="angry" title="Phẫn nộ" />
                                            </div>
                                        </button>
                                        <a className="action-button" href="/product-detail.html">
                                            <i className="fa-regular fa-comment" />
                                            <span>Bình luận</span>
                                        </a>
                                        <button className="action-button">
                                            <i className="fa-solid fa-share" />
                                            <span>Chia sẻ</span>
                                        </button>
                                    </div>
                                </article>
                                <article className="post-card">
                                    <div className="card-edit-button">
                                        <a href="/edit-artwork.html">✏️ Chỉnh sửa</a>
                                    </div>
                                    <a href="/product-detail.html" className="post-image-link">
                                        <div className="post-image">
                                            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cfdd8d93-55a1-4533-992c-6ce766867e07/djqdfxy-82c26d2f-6300-447f-8f17-637d9ee57a83.png/v1/fill/w_1189,h_672,q_70,strp/the_stone_that_speaks_at_dusk_by_linaewendreams_djqdfxy-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4NiIsInBhdGgiOiIvZi9jZmRkOGQ5My01NWExLTQ1MzMtOTkyYy02Y2U3NjY4NjdlMDcvZGpxZGZ4eS04MmMyNmQyZi02MzAwLTQ0N2YtOGYxNy02MzdkOWVlNTdhODMucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.zWuphivHJJ0ZOFH89JohjcrqiJRz4ztehns9pq2NLl0" alt="Tên tác phẩm" />
                                        </div>
                                    </a>
                                    <div className="post-card-content">
                                        <div className="post-author">
                                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" alt="Avatar Nghệ sĩ" />
                                            <div className="author-details">
                                                <h4>Tên nghệ sĩ</h4>
                                                <p>Thời gian đăng</p>
                                            </div>
                                        </div>
                                        <a href="/product-detail.html" className="post-title-link">
                                            <h3>Tên tác phẩm</h3>
                                        </a>
                                        <p className="post-description">Một tác phẩm nghệ thuật đương đại với những đường nét táo
                                            bạo, thể hiện cảm xúc sâu sắc...</p>
                                        <div className="price">3,500,000 VNĐ</div>
                                    </div>
                                    <div className="post-actions">
                                        <button className="action-button like-button">
                                            <i className="fa-regular fa-thumbs-up" />
                                            <span>Thích</span>
                                            <div className="reaction-popup">
                                                <i className="fa-solid fa-thumbs-up reaction-icon" data-reaction="like" title="Thích" />
                                                <i className="fa-solid fa-heart reaction-icon" data-reaction="love" title="Yêu thích" />
                                                <i className="fa-solid fa-face-laugh-squint reaction-icon" data-reaction="haha" title="Haha" />
                                                <i className="fa-solid fa-face-surprise reaction-icon" data-reaction="wow" title="Wow" />
                                                <i className="fa-solid fa-face-sad-tear reaction-icon" data-reaction="sad" title="Buồn" />
                                                <i className="fa-solid fa-face-angry reaction-icon" data-reaction="angry" title="Phẫn nộ" />
                                            </div>
                                        </button>
                                        <a className="action-button" href="/product-detail.html">
                                            <i className="fa-regular fa-comment" />
                                            <span>Bình luận</span>
                                        </a>
                                        <button className="action-button">
                                            <i className="fa-solid fa-share" />
                                            <span>Chia sẻ</span>
                                        </button>
                                    </div>
                                </article>
                                <article className="post-card">
                                    <div className="card-edit-button">
                                        <a href="/edit-artwork.html">✏️ Chỉnh sửa</a>
                                    </div>
                                    <a href="/product-detail.html" className="post-image-link">
                                        <div className="post-image">
                                            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cfdd8d93-55a1-4533-992c-6ce766867e07/dkeaqr3-4bb22366-3876-4f0e-9746-3a3cae72d57c.png/v1/fill/w_1190,h_672,q_70,strp/_the_forest_that_lingers_by_linaewendreams_dkeaqr3-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4NCIsInBhdGgiOiIvZi9jZmRkOGQ5My01NWExLTQ1MzMtOTkyYy02Y2U3NjY4NjdlMDcvZGtlYXFyMy00YmIyMjM2Ni0zODc2LTRmMGUtOTc0Ni0zYTNjYWU3MmQ1N2MucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.MR8EKmyEJN4WbGnElgYpS1oza09rAVO-mB2KWWBu9Fo" alt="Tên tác phẩm" />
                                        </div>
                                    </a>
                                    <div className="post-card-content">
                                        <div className="post-author">
                                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" alt="Avatar Nghệ sĩ" />
                                            <div className="author-details">
                                                <h4>Tên nghệ sĩ</h4>
                                                <p>Thời gian đăng</p>
                                            </div>
                                        </div>
                                        <a href="/product-detail.html" className="post-title-link">
                                            <h3>Tên tác phẩm</h3>
                                        </a>
                                        <p className="post-description">Một tác phẩm nghệ thuật đương đại với những đường nét táo
                                            bạo, thể hiện cảm xúc sâu sắc...</p>
                                        <div className="price">3,500,000 VNĐ</div>
                                    </div>
                                    <div className="post-actions">
                                        <button className="action-button like-button">
                                            <i className="fa-regular fa-thumbs-up" />
                                            <span>Thích</span>
                                            <div className="reaction-popup">
                                                <i className="fa-solid fa-thumbs-up reaction-icon" data-reaction="like" title="Thích" />
                                                <i className="fa-solid fa-heart reaction-icon" data-reaction="love" title="Yêu thích" />
                                                <i className="fa-solid fa-face-laugh-squint reaction-icon" data-reaction="haha" title="Haha" />
                                                <i className="fa-solid fa-face-surprise reaction-icon" data-reaction="wow" title="Wow" />
                                                <i className="fa-solid fa-face-sad-tear reaction-icon" data-reaction="sad" title="Buồn" />
                                                <i className="fa-solid fa-face-angry reaction-icon" data-reaction="angry" title="Phẫn nộ" />
                                            </div>
                                        </button>
                                        <a className="action-button" href="/product-detail.html">
                                            <i className="fa-regular fa-comment" />
                                            <span>Bình luận</span>
                                        </a>
                                        <button className="action-button">
                                            <i className="fa-solid fa-share" />
                                            <span>Chia sẻ</span>
                                        </button>
                                    </div>
                                </article>
                            </div>
                            <div className="slider-dots" />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
export default HomePage;