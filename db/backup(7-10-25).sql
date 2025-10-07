--
-- PostgreSQL database dump
--

\restrict IXxL9lGJoZebtV41FGh5hDwR9WLFghRfmIDT64cFD7ewvkeUVvyE5HZsovlReDa

-- Dumped from database version 17.6 (Debian 17.6-1.pgdg13+1)
-- Dumped by pg_dump version 17.6 (Debian 17.6-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Order; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    address text NOT NULL,
    amount double precision NOT NULL,
    status text DEFAULT 'Pending'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    email text NOT NULL,
    "orderID" text NOT NULL,
    "paymentInfo" text,
    "deliveryStatus" text DEFAULT 'unshipped'::text NOT NULL,
    "transactionID" text,
    city text DEFAULT 'Unknown'::text NOT NULL,
    state text DEFAULT 'Unknown'::text NOT NULL
);


ALTER TABLE public."Order" OWNER TO admin;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    title text NOT NULL,
    product text NOT NULL,
    "desc" text NOT NULL,
    img text NOT NULL,
    category text NOT NULL,
    price double precision NOT NULL,
    "availableQty" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    size text NOT NULL,
    color text NOT NULL
);


ALTER TABLE public."Product" OWNER TO admin;

--
-- Name: ProductOrder; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."ProductOrder" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    "productId" text NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    color text NOT NULL,
    price double precision NOT NULL,
    size text NOT NULL
);


ALTER TABLE public."ProductOrder" OWNER TO admin;

--
-- Name: User; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    mobile text NOT NULL,
    city text DEFAULT 'Unknown'::text NOT NULL,
    state text DEFAULT 'Unknown'::text NOT NULL,
    address text DEFAULT 'Unknown'::text NOT NULL
);


ALTER TABLE public."User" OWNER TO admin;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO admin;

--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Order" (id, address, amount, status, "createdAt", "updatedAt", email, "orderID", "paymentInfo", "deliveryStatus", "transactionID", city, state) FROM stdin;
cmg9tft9d0009ummo6qbrqux1	aaaaaaaaaaaaaaaaaaaaaaaaaaa	1679.97	Pending	2025-10-02 19:36:09.698	2025-10-02 19:36:09.698	test@gmail.com	910143626662	\N	unshipped	\N	Unknown	Unknown
cmg9tg0rh000dummovpbp2vdq	aaaaaaaaaaaaaaaaaaaaaaaaaaa	559.99	Paid	2025-10-02 19:36:19.419	2025-10-03 06:29:57.871	test@gmail.com	370763407489	{"orderId":"370763407489","STATUS":"TXN_SUCCESS"}	unshipped	\N	Unknown	Unknown
cmg9tfjvt0005ummoi75mgi93	aaaaaaaaaaaaaaaaaaaaaaaaaaa	1679.97	Paid	2025-10-02 19:35:57.545	2025-10-03 06:32:53.067	test@gmail.com	1392711834278	{"orderId":"1392711834278","STATUS":"TXN_SUCCESS"}	unshipped	\N	Unknown	Unknown
cmgaji57w0001um6si2ukk6js	qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq	1894.97	Paid	2025-10-03 07:45:48.417	2025-10-03 09:47:26.469	test@gmail.com	937086589238	{"orderId":"937086589238","STATUS":"TXN_SUCCESS"}	unshipped	\N	Unknown	Unknown
cmgao50dl0008um6s5brrcmqn	qqqqqqwwwwwwwwwwwwwwwwwwwwwwwwwwwwww	7929.86	Pending	2025-10-03 09:55:33.765	2025-10-03 09:55:33.765	test@gmail.com	204281749429	\N	unshipped	\N	Unknown	Unknown
cmg9td0pb0001ummow2tvxft4	aaaaaaaaaaaaaaaaaaaaaaaaaaa	559.99	Cancelled	2025-10-02 19:33:59.215	2025-10-03 11:06:46.018	test@gmail.com	69767409771	\N	unshipped	\N	Unknown	Unknown
cmgav9irf000fum6slkybxr01	rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr	15	Pending	2025-10-03 13:15:01.503	2025-10-03 13:15:01.503	test@gmail.com	1532160523233	\N	unshipped	\N	Unknown	Unknown
cmgc1ftwq0001um0chifdqw8s	eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee	3	Pending	2025-10-04 08:55:39.818	2025-10-04 08:55:39.818	test@gmail.com	967796916735	\N	unshipped	\N	Unknown	Unknown
cmgc392x20005um0c79u6457y	eeeeeeeeeeeeeeeeeeeeeeeeeeee	1	Pending	2025-10-04 09:46:24.135	2025-10-04 09:46:24.135	test@gmail.com	245072423578	\N	unshipped	\N	Unknown	Unknown
cmgc39hea0009um0cqns2m9g0	eeeeeeeeeeeeeeeeeeeeeeeeeeee	1	Pending	2025-10-04 09:46:42.899	2025-10-04 09:46:42.899	test@gmail.com	257903233238	\N	unshipped	\N	Unknown	Unknown
cmgc3a2mf000dum0cw75erf9n	wwwwwwwwwwwwwwwwwwwww	1	Pending	2025-10-04 09:47:10.408	2025-10-04 09:47:10.408	test@gmail.com	1141832165	\N	unshipped	\N	Unknown	Unknown
cmgc3b184000hum0c3aybwpyc	wwwwwwwwwwwwwwwwwwwww	1	Pending	2025-10-04 09:47:55.252	2025-10-04 09:47:55.252	test@gmail.com	1620569945175	\N	unshipped	\N	Unknown	Unknown
cmgc3k3qv000pum0ckrq6xj30	wwwwwwwwwwwwwwwwww	1180	Paid	2025-10-04 09:54:58.424	2025-10-04 09:57:56.84	test@gmail.com	883253400066	{"orderId":"883253400066","STATUS":"TXN_SUCCESS"}	unshipped	\N	Unknown	Unknown
cmgc3pqip000tum0c8e25gav4	tttttttttttttttttttttttttt	5980	Paid	2025-10-04 09:59:21.218	2025-10-04 10:00:03.291	test@gmail.com	772124912377	{"orderId":"772124912377","STATUS":"TXN_SUCCESS"}	unshipped	\N	Unknown	Unknown
cmgc3cdgm000lum0c4klk35jc	wwwwwwwwwww	1	Paid	2025-10-04 09:48:57.766	2025-10-04 10:19:10.282	test@gmail.com	1083267005305	{"orderId":"1083267005305","STATUS":"TXN_SUCCESS"}	unshipped	\N	Unknown	Unknown
cmgavrgr1000num6shfvh5ddf	aaaaaaaaaaaaaaaaaaaaaaaaaaaa	3	Paid	2025-10-03 13:28:58.675	2025-10-04 10:21:07.451	test@gmail.com	1116033918146	{"orderId":"1116033918146","STATUS":"TXN_SUCCESS"}	unshipped	\N	Unknown	Unknown
cmgclgbuo0001ummco8n0bg0q	wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww	499.99	Pending	2025-10-04 18:15:55.318	2025-10-04 18:15:55.318	test@gmail.com	1456359237106	\N	unshipped	\N	Unknown	Unknown
cmgdb6jyg0001umxc9k2bt2mp	rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr, Pincode: 442401	1059.98	Pending	2025-10-05 06:16:09.352	2025-10-05 06:16:09.352	test@gmail.com	542665673352	\N	unshipped	\N	Unknown	Unknown
cmgdb9w6e0006umxcjullswjd	oooooooooooooooooooooooooooooooooooooooo, Chandrapur, Maharashtra, Pincode: 442401	1059.98	Pending	2025-10-05 06:18:45.158	2025-10-05 06:18:45.158	test@gmail.com	955895296364	\N	unshipped	\N	Unknown	Unknown
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Product" (id, title, product, "desc", img, category, price, "availableQty", "createdAt", "updatedAt", size, color) FROM stdin;
cmfuvni1x001sumcg35ijyyb7	Urban Fit Tee	TSHIRT3001-RED-3XL	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	559.99	14	2025-09-22 08:41:35.014	2025-09-22 12:17:16.825	3XL	#FF0000
cmfuvnq07001tumcgt16kdjd4	Urban Fit Tee	TSHIRT3001-BLU-M	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	399.99	19	2025-09-22 08:41:45.318	2025-09-22 12:17:16.825	M	#0000FF
cmfuvnvob001uumcgmxlsahle	Urban Fit Tee	TSHIRT3001-BLU-L	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	429.99	17	2025-09-22 08:41:52.667	2025-09-22 12:17:16.825	L	#0000FF
cmfuvo2d1001vumcgbnk7nfzg	Urban Fit Tee	TSHIRT3001-BLU-2XL	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	509.99	12	2025-09-22 08:42:01.332	2025-09-22 12:17:16.825	2XL	#0000FF
cmfuvo99r001wumcg4u4z412s	Urban Fit Tee	TSHIRT3001-BLU-3XL	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	559.99	11	2025-09-22 08:42:10.287	2025-09-22 12:17:16.825	3XL	#0000FF
cmfuvoibk001xumcgyxpuaoh7	Urban Fit Tee	TSHIRT3001-GRN-S	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	359.99	23	2025-09-22 08:42:22.015	2025-09-22 12:17:16.825	S	#008000
cmfuvor1z001yumcg8efx1mcj	Urban Fit Tee	TSHIRT3001-GRN-M	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	399.99	22	2025-09-22 08:42:33.335	2025-09-22 12:17:16.825	M	#008000
cmfuvozzd001zumcggu7arx90	Urban Fit Tee	TSHIRT3001-GRN-L	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	429.99	19	2025-09-22 08:42:44.904	2025-09-22 12:17:16.825	L	#008000
cmfuvp7ms0020umcgkz1zy5qt	Urban Fit Tee	TSHIRT3001-GRN-XL	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	459.99	18	2025-09-22 08:42:54.82	2025-09-22 12:17:16.825	XL	#008000
cmfuvpg1i0021umcgjtz3yax5	Urban Fit Tee	TSHIRT3001-GRN-2XL	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	509.99	14	2025-09-22 08:43:05.717	2025-09-22 12:17:16.825	2XL	#008000
cmfuvq11w0022umcge56ist2r	Urban Fit Tee	TSHIRT3001-GRN-3XL	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	559.99	10	2025-09-22 08:43:32.947	2025-09-22 12:17:16.825	3XL	#008000
cmfuvq79k0023umcgoiuruc40	Urban Fit Tee	TSHIRT3001-WHT-XL	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	459.99	17	2025-09-22 08:43:41.001	2025-09-22 12:17:16.825	XL	#FFFFFF
cmfuvqwr40024umcgupiyf7b1	Urban Fit Tee	TSHIRT3001-WHT-2XL	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	509.99	16	2025-09-22 08:44:14.031	2025-09-22 12:17:16.825	2XL	#FFFFFF
cmfuvr32j0025umcgp4he41ui	Urban Fit Tee	TSHIRT3001-RED-L	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	429.99	20	2025-09-22 08:44:22.219	2025-09-22 12:17:16.825	L	#FF0000
cmfuwg2ld004humcg6t9avbon	Steel Horizon Tee	STH707-GRY-M	A sleek grey tee perfect for any occasion.	https://m.media-amazon.com/images/I/41ugF7lPzdL.jpg	tshirt	375	16	2025-09-22 09:03:48	2025-09-23 04:59:59.028	M	#708090
cmfxqas870000um28a0t3hxmh	Moonlit Mirage Hoodie	MMH500-GRY-S	Cozy gray hoodie with ethereal moonlit patterns.	https://m.media-amazon.com/images/I/61LktyEFUfL._SY741_.jpg	hoodies	1200	20	2025-09-24 08:35:02.075	2025-09-24 08:55:25.161	S	#A9A9A9
cmfxqb2vp0001um285s5ue1zn	Moonlit Mirage Hoodie	MMH500-GRY-M	Cozy gray hoodie with ethereal moonlit patterns.	https://m.media-amazon.com/images/I/61LktyEFUfL._SY741_.jpg	hoodies	1225	18	2025-09-24 08:35:15.926	2025-09-24 08:55:25.161	M	#A9A9A9
cmfxqbe1f0002um2810sbnnvp	Ember Glow Hoodie	EGH610-RED-L	Warm red hoodie inspired by ember glow vibes.	https://m.media-amazon.com/images/I/51vhSJ4YktL._SY741_.jpg	hoodies	1150	15	2025-09-24 08:35:30.386	2025-09-24 08:57:32.34	L	#FF4500
cmfxqbos90003um28tkj93irs	Ember Glow Hoodie	EGH610-RED-XL	Warm red hoodie inspired by ember glow vibes.	https://m.media-amazon.com/images/I/51vhSJ4YktL._SY741_.jpg	hoodies	1175	12	2025-09-24 08:35:44.313	2025-09-24 08:57:32.34	XL	#FF4500
cmfxqck4i0007um28vl40tcg4	Golden Dusk Hoodie	GDH830-YLW-XL	Golden yellow hoodie reflecting the calm of dusk.	https://m.media-amazon.com/images/I/61vWihW+DrL._SY741_.jpg	hoodies	1250	13	2025-09-24 08:36:24.931	2025-09-24 08:59:34.271	XL	#FFD700
cmfxqbwjh0004um28eiwy87pq	Ocean Breeze Hoodie	OBH720-BLU-S	Relaxing blue hoodie with ocean breeze inspired design.	https://m.media-amazon.com/images/I/51mpSbG4+JL._SX679_.jpg	hoodies	1180	22	2025-09-24 08:35:54.364	2025-09-24 08:58:48.125	S	#1E90FF
cmfxqc2wp0005um28je4cg05t	Ocean Breeze Hoodie	OBH720-BLU-M	Relaxing blue hoodie with ocean breeze inspired design.	https://m.media-amazon.com/images/I/51mpSbG4+JL._SX679_.jpg	hoodies	1200	19	2025-09-24 08:36:02.617	2025-09-24 08:58:48.125	M	#1E90FF
cmfxqfggn000eum28qlm68l7p	Crimson Ember Hoodie	CEH640-RED-S	Bold red hoodie with ember-like gradients for a striking look.	https://m.media-amazon.com/images/I/61cHrJOz-eL._SX569_.jpg	hoodies	1190	19	2025-09-24 08:38:40.15	2025-09-24 09:03:38.565	S	#DC143C
cmfxqf2ze000cum28t4coe41o	Aurora Glow Hoodie	AGH730-PUR-S	Vibrant purple hoodie inspired by northern lights auroras.	https://m.media-amazon.com/images/I/51IGBM2jN6L._SY741_.jpg	hoodies	1300	15	2025-09-24 08:38:22.681	2025-09-24 09:01:12.632	S	#800080
cmfxqe3jx0008um28tc3ng78h	Starlit Night Hoodie	SNH910-NV-S	Deep navy hoodie inspired by twinkling starlit skies.	https://m.media-amazon.com/images/I/51E8s08PAPL._SX679_.jpg	hoodies	1250	18	2025-09-24 08:37:36.764	2025-09-24 09:02:02.5	S	#191970
cmfxqebhu0009um28ufvk0yab	Starlit Night Hoodie	SNH910-NV-M	Deep navy hoodie inspired by twinkling starlit skies.	https://m.media-amazon.com/images/I/51E8s08PAPL._SX679_.jpg	hoodies	1275	16	2025-09-24 08:37:47.058	2025-09-24 09:02:02.5	M	#191970
cmfxs8h8e001fum288hgz1p91	Aurora Glow Wallpaper	AGW730	Vibrant purple wallpaper inspired by northern lights auroras.	https://m.media-amazon.com/images/I/31+c-qEhCeL._SY300_SX300_QL70_FMwebp_.jpg	wallpapers	800	30	2025-09-24 09:29:13.791	2025-09-24 09:34:42.449	1920x1080px	#800080
cmfxs8nyn001gum28owmwvwd0	Golden Dusk Wallpaper	GDW830	Golden yellow wallpaper reflecting the calm of dusk.	https://m.media-amazon.com/images/I/51LVSlpk9bL._SX300_SY300_QL70_FMwebp_.jpg	wallpapers	820	25	2025-09-24 09:29:22.51	2025-09-24 09:36:23.495	3840x2160px	#FFD700
cmfuvyubf002yumcgss5pfijx	Coastal Breeze Tee	TST901-WHT-2XL	Lightweight and breathable tee inspired by ocean vibes.	https://m.media-amazon.com/images/I/713V0paRPeL._SY741_.jpg	tshirt	499.99	10	2025-09-22 08:50:24.124	2025-09-22 12:18:37.547	2XL	#FFFFFF
cmfuw023w0035umcgsov8b4cb	Scarlet Flame Tee	TST903-RED-XL	A fiery red t-shirt that brings passion to your style.	https://m.media-amazon.com/images/I/614pajP6NBL._SY741_.jpg	tshirt	459.99	16	2025-09-22 08:51:20.877	2025-09-23 04:33:53.633	XL	#FF0000
cmfxqfop3000fum2824z5m5x9	Crimson Ember Hoodie	CEH640-RED-2XL	Bold red hoodie with ember-like gradients for a striking look.	https://m.media-amazon.com/images/I/61cHrJOz-eL._SX569_.jpg	hoodies	1210	17	2025-09-24 08:38:50.823	2025-09-24 09:03:38.565	2XL	#DC143C
cmfuv04om0000umcg9cxxv1rr	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	349.99	0	2025-09-22 08:23:24.585	2025-10-04 17:30:14.836	S	#FFFFFF
cmfuv2mlg0001umcg4q9rnuf2	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	399.99	25	2025-09-22 08:25:21.096	2025-09-22 11:51:46.332	M	#FFFFFF
cmfuv2x2e0002umcgu472ll3b	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	449.99	25	2025-09-22 08:25:34.694	2025-09-22 11:51:46.332	L	#FFFFFF
cmfuv360v0003umcgo5vrs7x6	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	499.99	25	2025-09-22 08:25:46.302	2025-09-22 11:51:46.332	XL	#FFFFFF
cmfuv3fu90004umcg6ayuhcco	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	549.99	25	2025-09-22 08:25:59.025	2025-09-22 11:51:46.332	2XL	#FFFFFF
cmfuv6d7d000bumcgyhg4xq5i	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/818P5D7lEhL._SX679_.jpg	tshirt	2	25	2025-09-22 08:28:15.576	2025-09-28 10:28:44.148	3XL	#000000
cmfuv3xm30006umcgtj8xdk5p	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	349.99	25	2025-09-22 08:26:22.06	2025-09-22 11:51:46.332	S	#000000
cmfuv5d5k0007umcgzi7s02ab	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	399.99	25	2025-09-22 08:27:28.855	2025-09-22 11:51:46.332	M	#000000
cmfuv5n3p0008umcgv7e7a1r1	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	449.99	25	2025-09-22 08:27:41.749	2025-09-22 11:51:46.332	L	#000000
cmfuv5wcf0009umcgvdu2s0ex	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	499.99	25	2025-09-22 08:27:53.727	2025-09-22 11:51:46.332	XL	#000000
cmfuv63zc000aumcgzdpli3tn	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	649.99	25	2025-09-22 08:28:03.624	2025-09-28 16:13:32.751	2XL	#000000
cmfuv6nbu000cumcgnfifmm7n	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	349.99	25	2025-09-22 08:28:28.68	2025-09-22 11:51:46.332	S	#FF0000
cmfuv6v5l000dumcgwqklpoo1	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	399.99	25	2025-09-22 08:28:38.842	2025-09-22 11:51:46.332	M	#FF0000
cmfuv3mof0005umcg7gvzsjyr	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81G6USwt4LL._SX679_.jpg	tshirt	1	24	2025-09-22 08:26:07.886	2025-10-04 10:19:10.294	3XL	#FFFFFF
cmfxs8u1b001hum287m6c7m2o	Crimson Blaze Wallpaper	CBW640	Bold red wallpaper with fiery gradient patterns for a striking look.	https://m.media-amazon.com/images/I/51XrwkdNUGL._SY300_SX300_QL70_FMwebp_.jpg	wallpapers	790	30	2025-09-24 09:29:30.384	2025-09-24 09:37:02.761	2560x1440px	#DC143C
cmfxs90sr001ium28vu7cp1o1	Ocean Breeze Wallpaper	OBW720	Turquoise wallpaper inspired by serene ocean breeze patterns.	https://m.media-amazon.com/images/I/51FoBgbh+cL._SY300_SX300_QL70_FMwebp_.jpg	wallpapers	770	35	2025-09-24 09:29:39.147	2025-09-24 09:38:05.8	1920x1080px	#1E90FF
cmfxs9751001jum28k4pr7f3r	Lavender Dreams Wallpaper	LDW750	Soft lavender wallpaper with dreamy pastel textures.	https://m.media-amazon.com/images/I/51ZA3u1R83L._SX300_SY300_QL70_FMwebp_.jpg	wallpapers	780	30	2025-09-24 09:29:47.365	2025-09-24 09:38:57.03	2560x1440px	#E6E6FA
cmfxs9hoq001lum28notbqrbg	Moonlit Glow Wallpaper	MGW500	Soft gray wallpaper with gentle moonlit glow patterns.	https://m.media-amazon.com/images/I/51b9avRNgQL._SX300_SY300_QL70_FMwebp_.jpg	wallpapers	760	40	2025-09-24 09:30:01.034	2025-09-24 09:39:41.063	1920x1080px	#A9A9A9
cmfxs9cd9001kum281x80ul8x	Forest Mist Wallpaper	FMW820	Earthy green wallpaper with subtle forest-inspired patterns.	https://m.media-amazon.com/images/I/41bZChG7GhL._SS100_.jpg	wallpapers	800	25	2025-09-24 09:29:54.141	2025-09-24 09:40:18.803	3840x2160px	#228B22
cmfxqcbx00006um28kui2sr2a	Golden Dusk Hoodie	GDH830-YLW-3XL	Golden yellow hoodie reflecting the calm of dusk.	https://m.media-amazon.com/images/I/61vWihW+DrL._SY741_.jpg	hoodies	1230	16	2025-09-24 08:36:14.291	2025-09-24 08:59:34.271	3XL	#FFD700
cmfxqf9nl000dum282fzbwqdm	Aurora Glow Hoodie	AGH730-PUR-3XL	Vibrant purple hoodie inspired by northern lights auroras.	https://m.media-amazon.com/images/I/51IGBM2jN6L._SY741_.jpg	hoodies	1320	12	2025-09-24 08:38:31.329	2025-09-24 09:01:12.632	3XL	#800080
cmfuvz7e80030umcgg08rp4q7	Midnight Mode Tee	TST902-BLK-L	Bold and timeless black tee designed for everyday edge.	https://m.media-amazon.com/images/I/51f5hkE87aL._SY741_.jpg	tshirt	419.99	14	2025-09-22 08:50:41.072	2025-09-22 12:27:15.906	L	#000000
cmfuvzd9k0031umcg4cqi4k0e	Midnight Mode Tee	TST902-BLK-XL	Bold and timeless black tee designed for everyday edge.	https://m.media-amazon.com/images/I/51f5hkE87aL._SY741_.jpg	tshirt	449.99	12	2025-09-22 08:50:48.68	2025-09-22 12:27:15.906	XL	#000000
cmfuw0sal0039umcgzu5pw1ah	Ocean Drift Tee	TST904-BLU-XL	A calming blue tee that captures the spirit of the sea.	https://m.media-amazon.com/images/I/31oOG+mPQnL._SX342_SY445_.jpg	tshirt	449.99	16	2025-09-22 08:51:54.813	2025-09-23 04:35:47.684	XL	#0000FF
cmfuvgdtj000uumcg4sl7vjxu	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	389.99	18	2025-09-22 08:36:02.917	2025-09-22 12:07:03.974	M	#000000
cmfuvglz2000vumcgih43dnwf	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	459.99	12	2025-09-22 08:36:13.502	2025-09-22 12:07:03.974	XL	#FF0000
cmfuvgt6f000wumcg7ojwiudv	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	509.99	11	2025-09-22 08:36:22.838	2025-09-22 12:07:03.974	2XL	#008000
cmfuvgza6000xumcgzwnislpv	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	549.99	10	2025-09-22 08:36:30.75	2025-09-22 12:07:03.974	3XL	#FFFFFF
cmfuvh5lv000yumcgbob4vfwr	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	359.99	20	2025-09-22 08:36:38.947	2025-09-22 12:07:03.974	S	#0000FF
cmfuvhdw5000zumcgavw9ps8o	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	429.99	15	2025-09-22 08:36:49.685	2025-09-22 12:07:03.974	L	#FF0000
cmfuvhl490010umcg48iqeqjj	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	459.99	13	2025-09-22 08:36:59.048	2025-09-22 12:07:03.974	XL	#FFFFFF
cmfuvhrlv0011umcg5w329rbu	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	359.99	21	2025-09-22 08:37:07.46	2025-09-22 12:07:03.974	S	#008000
cmfuvi47z0012umcgewr1ye9w	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	459.99	13	2025-09-22 08:37:23.806	2025-09-22 12:07:03.974	XL	#000000
cmfuvic3k0013umcgs92dkpio	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	549.99	10	2025-09-22 08:37:34.017	2025-09-22 12:07:03.974	3XL	#0000FF
cmfuvij1g0014umcg8fjag5wc	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	359.99	19	2025-09-22 08:37:43.011	2025-09-22 12:07:03.974	S	#FF0000
cmfuviov10015umcgoklaqgrz	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	389.99	17	2025-09-22 08:37:50.557	2025-09-22 12:07:03.974	M	#0000FF
cmfuviwns0016umcg9bto7d2t	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	389.99	18	2025-09-22 08:38:00.663	2025-09-22 12:07:03.974	M	#FFFFFF
cmfuvj2wq0017umcgk95ffwzx	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	509.99	12	2025-09-22 08:38:08.763	2025-09-22 12:07:03.974	2XL	#000000
cmfuvjaef0018umcg68ny83kb	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	459.99	14	2025-09-22 08:38:18.471	2025-09-22 12:07:03.974	XL	#008000
cmfxsakc0001qum28zftg3khm	Forest Haze Wallpaper	FHW820	Earthy green wallpaper with subtle forest-inspired textures.	https://m.media-amazon.com/images/I/816BPeVuFkL._SX679_.jpg	wallpapers	710	45	2025-09-24 09:30:51.119	2025-09-24 09:42:21.542	1920x1080px	#228B22
cmfxqeuqc000bum28tmo2f3su	Forest Haze Hoodie	FHH820-GRN-2XL	Earthy green hoodie with subtle forest-inspired patterns.	https://m.media-amazon.com/images/I/61PoKnqNbHL._SY741_.jpg	hoodies	1200	13	2025-09-24 08:38:11.988	2025-10-04 10:00:03.312	2XL	#228B22
cmfxsa8nb001pum28iezj7ksk	Crimson Ember Wallpaper	CEW640	Bold red wallpaper with ember-like gradients for a striking look.	https://m.media-amazon.com/images/I/412Csn4OeqL._SX300_SY300_QL70_FMwebp_.jpg	wallpapers	730	50	2025-09-24 09:30:35.974	2025-09-24 09:41:08.583	1920x1080px	#DC143C
cmfxqmy82000uum28xak6hjrq	Forest Mist Mug	FMM820-GRN	Earthy green mug with subtle forest-inspired patterns.	https://m.media-amazon.com/images/I/31CmzUny9AL._SX300_SY300_QL70_FMwebp_.jpg	mugs	465	31	2025-09-24 08:44:29.761	2025-09-24 09:20:05.073	350ml	#228B22
cmfxqn4zh000vum28ef22lw6o	Moonlit Glow Mug	MGM500-GRY	Soft gray mug with gentle moonlit glow patterns.	https://m.media-amazon.com/images/I/417hxPEuxWL._SX300_SY300_QL70_FMwebp_.jpg	mugs	475	27	2025-09-24 08:44:38.525	2025-09-24 09:13:51.305	350ml	#A9A9A9
cmfxqkc7s000num282v6j1doq	Lavender Dreams Mug	LDM750-LAV	Soft lavender mug with dreamy pastel designs.	https://m.media-amazon.com/images/I/41wnq58giQL._SX300_SY300_QL70_FMwebp_.jpg	mugs	455	40	2025-09-24 08:42:27.929	2025-09-24 09:14:43.24	350ml	#E6E6FA
cmfxqmqyq000tum28wtnq5msc	Lavender Dreams Mug	LDM750-LAV	Soft lavender mug with dreamy pastel designs.	https://m.media-amazon.com/images/I/613miEITaFL._SX679_.jpg	mugs	455	34	2025-09-24 08:44:20.355	2025-09-24 09:20:39.13	350ml	#E6E6FA
cmfuvlnhk001jumcgz77b6d0x	Urban Fit Tee	TSHIRT3001-WHT-M	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	399.99	16	2025-09-22 08:40:08.744	2025-09-22 12:17:16.825	M	#FFFFFF
cmfuvlzn8001kumcgfa0xmemv	Urban Fit Tee	TSHIRT3001-WHT-L	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	429.99	15	2025-09-22 08:40:24.499	2025-09-22 12:17:16.825	L	#FFFFFF
cmfuvm9bk001lumcgqp8d9d8h	Urban Fit Tee	TSHIRT3001-BLK-M	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	399.99	18	2025-09-22 08:40:37.04	2025-09-22 12:17:16.825	M	#000000
cmfuvmf4n001mumcgh3oqrc14	Urban Fit Tee	TSHIRT3001-BLK-XL	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	459.99	12	2025-09-22 08:40:44.566	2025-09-22 12:17:16.825	XL	#000000
cmfuvmmd0001numcggonb1fx9	Urban Fit Tee	TSHIRT3001-BLK-2XL	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	509.99	10	2025-09-22 08:40:53.94	2025-09-22 12:17:16.825	2XL	#000000
cmfuvmsz2001oumcgua9d9uz2	Urban Fit Tee	TSHIRT3001-BLK-3XL	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	559.99	13	2025-09-22 08:41:02.51	2025-09-22 12:17:16.825	3XL	#000000
cmfuvmzco001pumcgszup8h2m	Urban Fit Tee	TSHIRT3001-RED-S	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	359.99	24	2025-09-22 08:41:10.755	2025-09-22 12:17:16.825	S	#FF0000
cmfuvn651001qumcg0yw5echg	Urban Fit Tee	TSHIRT3001-RED-M	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	399.99	21	2025-09-22 08:41:19.574	2025-09-22 12:17:16.825	M	#FF0000
cmfuvnbqo001rumcg3bc52j8h	Urban Fit Tee	TSHIRT3001-RED-XL	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	459.99	15	2025-09-22 08:41:26.831	2025-09-22 12:17:16.825	XL	#FF0000
cmfuw5bxv003jumcgw87xgshl	Urban Edge Tee	URB100-WHT-L	A sleek, minimal tee made for city life.	https://m.media-amazon.com/images/I/51PlRNYFr5L._SX679_.jpg	tshirt	409.99	18	2025-09-22 08:55:26.898	2025-09-23 04:43:43.736	L	#FFFFFF
cmfuw5kep003kumcgb7wybb8q	Urban Edge Tee	URB100-WHT-XL	A sleek, minimal tee made for city life.	https://m.media-amazon.com/images/I/51PlRNYFr5L._SX679_.jpg	tshirt	449.99	15	2025-09-22 08:55:37.874	2025-09-23 04:43:43.736	XL	#FFFFFF
cmfuw7m9n003tumcgcseu9br4	Ocean Tide Tee	OCT400-BLU-XL	Cool and calming, inspired by ocean waves.	https://m.media-amazon.com/images/I/81Yw-UfQuwL._SX679_.jpg	tshirt	459.99	10	2025-09-22 08:57:13.594	2025-09-23 04:50:04.933	XL	#0000FF
cmfuw7s8x003uumcgt2ph06ce	Forest Chill Tee	FCH500-GRN-S	Laid-back green tee for earthy explorers.	https://m.media-amazon.com/images/I/61NVTARMyoL._SY741_.jpg	tshirt	379.99	17	2025-09-22 08:57:21.345	2025-09-23 04:50:56.619	S	#008000
cmfuw7xy9003vumcge5gddxwu	Forest Chill Tee	FCH500-GRN-M	Laid-back green tee for earthy explorers.	https://m.media-amazon.com/images/I/61NVTARMyoL._SY741_.jpg	tshirt	399.99	15	2025-09-22 08:57:28.736	2025-09-23 04:50:56.619	M	#008000
cmfuw6lxh003oumcg11zv4e2m	Sunrise Glow Tee	SGL300-RED-S	Brighten your day with this radiant red tee.	https://m.media-amazon.com/images/I/71Bt9DdAhFL._SX569_.jpg	tshirt	369.99	16	2025-09-22 08:56:26.501	2025-09-23 04:46:48.249	S	#FF0000
cmfuw6rzo003pumcgg37et6gd	Sunrise Glow Tee	SGL300-RED-M	Brighten your day with this radiant red tee.	https://m.media-amazon.com/images/I/71Bt9DdAhFL._SX569_.jpg	tshirt	399.99	14	2025-09-22 08:56:34.355	2025-09-23 04:46:48.249	M	#FF0000
cmfuw70u6003qumcglb1ud5bb	Sunrise Glow Tee	SGL300-RED-L	Brighten your day with this radiant red tee.	https://m.media-amazon.com/images/I/71Bt9DdAhFL._SX569_.jpg	tshirt	429.99	12	2025-09-22 08:56:45.822	2025-09-23 04:46:48.249	L	#FF0000
cmfuw6fhj003numcgsvyhffod	Midnight Pulse Tee	MDP200-BLK-XL	Feel the beat of the city in this bold black tee.	https://m.media-amazon.com/images/I/61NfCPyaoqL._SX569_.jpg	tshirt	459.99	10	2025-09-22 08:56:18.139	2025-09-23 04:48:55.65	XL	#000000
cmfuw68d3003mumcghgr3nknr	Midnight Pulse Tee	MDP200-BLK-L	Feel the beat of the city in this bold black tee.	https://m.media-amazon.com/images/I/61NfCPyaoqL._SX569_.jpg	tshirt	419.99	13	2025-09-22 08:56:08.918	2025-09-23 04:48:55.65	L	#000000
cmfuw5us6003lumcg7nvbi76v	Midnight Pulse Tee	MDP200-BLK-M	Feel the beat of the city in this bold black tee.	https://m.media-amazon.com/images/I/61NfCPyaoqL._SX569_.jpg	tshirt	379.99	12	2025-09-22 08:55:51.317	2025-09-23 04:48:55.65	M	#000000
cmfuw77mr003rumcgfhlsnqps	Ocean Tide Tee	OCT400-BLU-M	Cool and calming, inspired by ocean waves.	https://m.media-amazon.com/images/I/81Yw-UfQuwL._SX679_.jpg	tshirt	389.99	18	2025-09-22 08:56:54.627	2025-09-23 04:50:04.933	M	#0000FF
cmfuw7evc003sumcgs2ofb0st	Ocean Tide Tee	OCT400-BLU-L	Cool and calming, inspired by ocean waves.	https://m.media-amazon.com/images/I/81Yw-UfQuwL._SX679_.jpg	tshirt	419.99	14	2025-09-22 08:57:04.009	2025-09-23 04:50:04.933	L	#0000FF
cmfuw851b003wumcg6sakcshy	Forest Chill Tee	FCH500-GRN-L	Laid-back green tee for earthy explorers.	https://m.media-amazon.com/images/I/61NVTARMyoL._SY741_.jpg	tshirt	429.99	13	2025-09-22 08:57:37.92	2025-09-23 04:50:56.619	L	#008000
cmfuw8awg003xumcgioer4fyn	Forest Chill Tee	FCH500-GRN-XL	Laid-back green tee for earthy explorers.	https://m.media-amazon.com/images/I/61NVTARMyoL._SY741_.jpg	tshirt	459.99	11	2025-09-22 08:57:45.519	2025-09-23 04:50:56.619	XL	#008000
cmfuw8imw003yumcg9noae3d7	Sunset Dust Tee	SDT600-ORG-S	Burnt orange tones for a desert sunset feel.	https://m.media-amazon.com/images/I/61B8NHnKkaL._SY741_.jpg	tshirt	369.99	20	2025-09-22 08:57:55.544	2025-09-23 04:53:38.113	S	#FFA500
cmfuw8pde003zumcgmbtes6sk	Sunset Dust Tee	SDT600-ORG-M	Burnt orange tones for a desert sunset feel.	https://m.media-amazon.com/images/I/61B8NHnKkaL._SY741_.jpg	tshirt	389.99	17	2025-09-22 08:58:04.273	2025-09-23 04:53:38.113	M	#FFA500
cmfxsb6sh001tum28r6hpxx8k	Ocean Drift Wallpaper	ODW320	Turquoise wallpaper featuring serene ocean drift patterns.	https://m.media-amazon.com/images/I/21QscKlObsL._SX300_SY300_QL70_FMwebp_.jpg	wallpapers	720	55	2025-09-24 09:31:20.225	2025-09-24 09:44:34.133	1920x1080px	#40E0D0
cmfxsbdse001uum28jge2e6hn	Rustic Ember Wallpaper	REW210	Earthy brown wallpaper featuring rustic ember-inspired patterns.	https://m.media-amazon.com/images/I/6168zLjZXvS._SX300_SY300_QL70_FMwebp_.jpg	wallpapers	700	45	2025-09-24 09:31:29.293	2025-09-24 09:43:17.38	1920x1080px	#8B4513
cmfuvx980002uumcgf57i5ku6	Coastal Breeze Tee	TST901-WHT-S	Lightweight and breathable tee inspired by ocean vibes.	https://m.media-amazon.com/images/I/713V0paRPeL._SY741_.jpg	tshirt	379.99	21	2025-09-22 08:49:10.127	2025-09-22 12:18:37.547	S	#FFFFFF
cmfuvy83s002vumcgjkdircsi	Coastal Breeze Tee	TST901-WHT-M	Lightweight and breathable tee inspired by ocean vibes.	https://m.media-amazon.com/images/I/713V0paRPeL._SY741_.jpg	tshirt	399.99	17	2025-09-22 08:49:55.335	2025-09-22 12:18:37.547	M	#FFFFFF
cmfuvyeij002wumcg7vzop7cp	Coastal Breeze Tee	TST901-WHT-L	Lightweight and breathable tee inspired by ocean vibes.	https://m.media-amazon.com/images/I/713V0paRPeL._SY741_.jpg	tshirt	419.99	12	2025-09-22 08:50:03.643	2025-09-22 12:18:37.547	L	#FFFFFF
cmfuvymky002xumcgkp4pgkpc	Coastal Breeze Tee	TST901-WHT-XL	Lightweight and breathable tee inspired by ocean vibes.	https://m.media-amazon.com/images/I/713V0paRPeL._SY741_.jpg	tshirt	459.99	11	2025-09-22 08:50:14.097	2025-09-22 12:18:37.547	XL	#FFFFFF
cmfuw8xdj0040umcgdhwom0mp	Sunset Dust Tee	SDT600-ORG-L	Burnt orange tones for a desert sunset feel.	https://m.media-amazon.com/images/I/61B8NHnKkaL._SY741_.jpg	tshirt	419.99	14	2025-09-22 08:58:14.647	2025-09-23 04:53:38.113	L	#FFA500
cmfuwapex0041umcgcy1w4vmc	Sunset Dust Tee	SDT600-ORG-XL	Burnt orange tones for a desert sunset feel.	https://m.media-amazon.com/images/I/61B8NHnKkaL._SY741_.jpg	tshirt	459.99	12	2025-09-22 08:59:37.64	2025-09-23 04:53:38.113	XL	#FFA500
cmfuwav8o0042umcgm8491les	Skyline Drift Tee	SKD700-GRY-M	Cool grey tee for smooth city transitions.	https://m.media-amazon.com/images/I/71D1h3npigL._SX679_.jpg	tshirt	399.99	13	2025-09-22 08:59:45.193	2025-09-23 04:54:42.03	M	#808080
cmfxs8aux001eum28q0en3caq	Starlit Night Wallpaper	SNW910	Deep navy wallpaper inspired by twinkling starlit skies.	https://m.media-amazon.com/images/I/61n+uLjp+kL._SX679_.jpg	wallpapers	780	35	2025-09-24 09:29:05.53	2025-09-24 09:34:00.831	2560x1440px	#191970
cmfuvrdvv0026umcg1ywfqz16	Everyday Essential Tee	TEE401-WHT-S	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	369.99	22	2025-09-22 08:44:36.234	2025-09-22 12:15:24.249	S	#FFFFFF
cmfuvrm2u0027umcg92abyiak	Everyday Essential Tee	TEE401-WHT-M	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	399.99	18	2025-09-22 08:44:46.854	2025-09-22 12:15:24.249	M	#FFFFFF
cmfxqiyk3000gum28fspukaqh	Celestial Glow Mug	CGM100-WHT	White ceramic mug with delicate celestial floral designs.	https://m.media-amazon.com/images/I/61NytvI+YTL._SX679_.jpg	mugs	450	50	2025-09-24 08:41:23.547	2025-09-24 09:07:06.409	350ml	#FFFFFF
cmfxqj7uv000hum28mupaqtjs	Rustic Ember Mug	REM210-BRN	Earthy brown ceramic mug featuring a rustic ember pattern.	https://m.media-amazon.com/images/I/41edZGugiEL._SX300_SY300_QL70_FMwebp_.jpg	mugs	430	40	2025-09-24 08:41:35.624	2025-09-24 09:08:39.911	350ml	#8B4513
cmfxqjf2g000ium288530u0ph	Ocean Drift Mug	ODM320-TQ	Turquoise mug inspired by serene ocean drift patterns.	https://m.media-amazon.com/images/I/31kNl2OSoIS._SX300_SY300_QL70_FMwebp_.jpg	mugs	440	45	2025-09-24 08:41:44.967	2025-09-24 09:08:39.911	350ml	#40E0D0
cmfxqjlou000jum28wbui1wm6	Golden Hour Mug	GHM430-YLW	Sunlit yellow mug capturing the magic of golden hour glow.	https://m.media-amazon.com/images/I/31U9W-qGt2L._SX300_SY300_QL70_FMwebp_.jpg	mugs	460	35	2025-09-24 08:41:53.551	2025-09-24 09:09:16.3	350ml	#FFD700
cmfxsat0d001rum28fje358c0	Aurora Night Wallpaper	ANW500	Deep navy wallpaper inspired by the northern lights aurora night sky.	https://m.media-amazon.com/images/I/31ClPEqMjmL._SX300_SY300_QL70_FMwebp_.jpg	wallpapers	770	35	2025-09-24 09:31:02.365	2025-09-24 09:33:19.5	1920x1080px	#191970
cmfuvz1rg002zumcgd7cyoftk	Midnight Mode Tee	TST902-BLK-M	Bold and timeless black tee designed for everyday edge.	https://m.media-amazon.com/images/I/51f5hkE87aL._SY741_.jpg	tshirt	389.99	20	2025-09-22 08:50:33.772	2025-09-22 12:27:15.906	M	#000000
cmfuvzjdt0032umcgfh1opboj	Scarlet Flame Tee	TST903-RED-S	A fiery red t-shirt that brings passion to your style.	https://m.media-amazon.com/images/I/614pajP6NBL._SY741_.jpg	tshirt	369.99	25	2025-09-22 08:50:56.608	2025-09-23 04:33:53.633	S	#FF0000
cmfuvzphc0033umcg2dnn130y	Scarlet Flame Tee	TST903-RED-M	A fiery red t-shirt that brings passion to your style.	https://m.media-amazon.com/images/I/614pajP6NBL._SY741_.jpg	tshirt	399.99	20	2025-09-22 08:51:04.513	2025-09-23 04:33:53.633	M	#FF0000
cmfuvzw1l0034umcgmf4jkomu	Scarlet Flame Tee	TST903-RED-L	A fiery red t-shirt that brings passion to your style.	https://m.media-amazon.com/images/I/614pajP6NBL._SY741_.jpg	tshirt	429.99	18	2025-09-22 08:51:12.995	2025-09-23 04:33:53.633	L	#FF0000
cmfuw0acn0036umcgohnxue29	Ocean Drift Tee	TST904-BLU-S	A calming blue tee that captures the spirit of the sea.	https://m.media-amazon.com/images/I/31oOG+mPQnL._SX342_SY445_.jpg	tshirt	379.99	23	2025-09-22 08:51:31.558	2025-09-23 04:35:47.684	S	#0000FF
cmfuw0gg50037umcgn9s20xz6	Ocean Drift Tee	TST904-BLU-M	A calming blue tee that captures the spirit of the sea.	https://m.media-amazon.com/images/I/31oOG+mPQnL._SX342_SY445_.jpg	tshirt	399.99	21	2025-09-22 08:51:39.461	2025-09-23 04:35:47.684	M	#0000FF
cmfuw0mux0038umcgiq8olz7a	Ocean Drift Tee	TST904-BLU-L	A calming blue tee that captures the spirit of the sea.	https://m.media-amazon.com/images/I/31oOG+mPQnL._SX342_SY445_.jpg	tshirt	419.99	19	2025-09-22 08:51:47.769	2025-09-23 04:35:47.684	L	#0000FF
cmfuw0yfy003aumcggr1qy7vi	Evergreen Vibe Tee	TST905-GRN-M	Fresh green tee for a natural, earth-loving vibe.	https://m.media-amazon.com/images/I/61EaNZ5e8zL._SY741_.jpg	tshirt	399.99	20	2025-09-22 08:52:02.781	2025-09-23 04:36:58.334	M	#008000
cmfuw158j003bumcgjzdfrwf9	Evergreen Vibe Tee	TST905-GRN-L	Fresh green tee for a natural, earth-loving vibe.	https://m.media-amazon.com/images/I/61EaNZ5e8zL._SY741_.jpg	tshirt	429.99	18	2025-09-22 08:52:11.588	2025-09-23 04:36:58.334	L	#008000
cmfuw1deu003cumcg8dhgfw8v	Evergreen Vibe Tee	TST905-GRN-XL	Fresh green tee for a natural, earth-loving vibe.	https://m.media-amazon.com/images/I/61EaNZ5e8zL._SY741_.jpg	tshirt	459.99	14	2025-09-22 08:52:22.181	2025-09-23 04:36:58.334	XL	#008000
cmfuw1ior003dumcgf70sschr	Evergreen Vibe Tee	TST905-GRN-2XL	Fresh green tee for a natural, earth-loving vibe.	https://m.media-amazon.com/images/I/61EaNZ5e8zL._SY741_.jpg	tshirt	489.99	12	2025-09-22 08:52:29.02	2025-09-23 04:36:58.334	2XL	#008000
cmfuw4uil003humcgdamb31ko	Urban Edge Tee	URB100-WHT-S	A sleek, minimal tee made for city life.	https://m.media-amazon.com/images/I/51PlRNYFr5L._SX679_.jpg	tshirt	369.99	19	2025-09-22 08:55:04.317	2025-09-23 04:43:43.736	S	#FFFFFF
cmfuw533z003iumcgbqg0ty5n	Urban Edge Tee	URB100-WHT-M	A sleek, minimal tee made for city life.	https://m.media-amazon.com/images/I/51PlRNYFr5L._SX679_.jpg	tshirt	389.99	14	2025-09-22 08:55:15.455	2025-09-23 04:43:43.736	M	#FFFFFF
cmfuw1py3003eumcgxsako9n9	Sunset Haze Tee	TST906-ORG-M	Vibrant orange hue inspired by golden hour skies.	https://m.media-amazon.com/images/I/71ZpQXo3F-L._SX569_.jpg	tshirt	389.99	20	2025-09-22 08:52:38.427	2025-09-23 04:52:47.809	M	#FFA500
cmfuw21fv003fumcgg5b3twrr	Sunset Haze Tee	TST906-ORG-L	Vibrant orange hue inspired by golden hour skies.	https://m.media-amazon.com/images/I/71ZpQXo3F-L._SX569_.jpg	tshirt	419.99	17	2025-09-22 08:52:53.324	2025-09-23 04:52:47.809	L	#FFA500
cmfuw27ux003gumcgorchsq5s	Sunset Haze Tee	TST906-ORG-XL	Vibrant orange hue inspired by golden hour skies.	https://m.media-amazon.com/images/I/71ZpQXo3F-L._SX569_.jpg	tshirt	459.99	15	2025-09-22 08:53:01.64	2025-09-23 04:52:47.809	XL	#FFA500
cmfxs9o9e001mum284n0dmio3	Sunset Horizon Wallpaper	SHW710	Orange and pink wallpaper reflecting a stunning sunset horizon.	https://m.media-amazon.com/images/I/71fcZ8+cQlL._SX679_.jpg	wallpapers	820	25	2025-09-24 09:30:09.554	2025-09-24 09:45:09.527	3840x2160px	#FF7F50
cmfxs9ujl001num28mi0zho4v	Twilight Spark Wallpaper	TSW600	Violet-pink wallpaper with sparkling twilight effects.	https://m.media-amazon.com/images/I/51m8JOX0e9S._SX300_SY300_QL70_FMwebp_.jpg	wallpapers	790	28	2025-09-24 09:30:17.696	2025-09-24 09:45:37.262	2560x1440px	#D8BFD8
cmfxsb0c6001sum28u4sm7vjz	Golden Hour Wallpaper	GHW430	Sunlit yellow wallpaper capturing the magic of golden hour glow.	https://m.media-amazon.com/images/I/711BoTAluHL._SX679_.jpg	wallpapers	750	40	2025-09-24 09:31:11.861	2025-09-24 09:46:20.124	1920x1080px	#FFD700
cmfuvakqk000numcgsvwhpwu7	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81Yw-UfQuwL._SX679_.jpg	tshirt	4	25	2025-09-22 08:31:31.963	2025-09-28 10:28:44.148	3XL	#0000FF
cmfuvc5fd000tumcgspz1khwm	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81pLXfPI1eL._SX679_.jpg	tshirt	5	25	2025-09-22 08:32:45.432	2025-09-28 10:28:44.148	3XL	#008000
cmfuvaak4000mumcgblqyd6oq	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	849.99	25	2025-09-22 08:31:18.773	2025-09-28 16:13:32.751	2XL	#0000FF
cmfuvbx9h000sumcgj0y8k7z5	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	949.99	25	2025-09-22 08:32:34.854	2025-09-28 16:13:32.751	2XL	#008000
cmfuvbp9s000rumcg46he91vw	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	499.99	25	2025-09-22 08:32:24.495	2025-09-22 11:51:46.332	XL	#008000
cmfuvbfi4000qumcgs6gi0cy0	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	449.99	25	2025-09-22 08:32:11.836	2025-09-22 11:51:46.332	L	#008000
cmfuvb71g000pumcg9730652e	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	399.99	25	2025-09-22 08:32:00.868	2025-09-22 11:51:46.332	M	#008000
cmfuvau3k000oumcgb9k7rjnf	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	349.99	25	2025-09-22 08:31:44.096	2025-09-22 11:51:46.332	S	#008000
cmfuva4d3000lumcgg3a29n7h	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	499.99	25	2025-09-22 08:31:10.742	2025-09-22 11:51:46.332	XL	#0000FF
cmfxqendq000aum28srq1lvcq	Forest Haze Hoodie	FHH820-GRN-L	Earthy green hoodie with subtle forest-inspired patterns.	https://m.media-amazon.com/images/I/61PoKnqNbHL._SY741_.jpg	hoodies	1180	18	2025-09-24 08:38:02.462	2025-10-04 10:00:03.309	L	#228B22
cmfuwb1x10043umcgbpomwud8	Skyline Drift Tee	SKD700-GRY-L	Cool grey tee for smooth city transitions.	https://m.media-amazon.com/images/I/71D1h3npigL._SX679_.jpg	tshirt	429.99	11	2025-09-22 08:59:53.845	2025-09-23 04:54:42.03	L	#808080
cmfuwb7pn0044umcgz30fioqd	Skyline Drift Tee	SKD700-GRY-XL	Cool grey tee for smooth city transitions.	https://m.media-amazon.com/images/I/71D1h3npigL._SX679_.jpg	tshirt	469.99	10	2025-09-22 09:00:01.355	2025-09-23 04:54:45.33	XL	#808080
cmfuwda0s0045umcgp3mvoy2e	Nebula Drift Tee	NBD101-PUR-M	Explore the cosmos with this vibrant purple tee.	https://m.media-amazon.com/images/I/712Qq0Y58UL._SX569_.jpg	tshirt	379	20	2025-09-22 09:01:37.648	2025-09-23 04:55:55.517	M	#800080
cmfuwdg8b0046umcgkmvui91p	Nebula Drift Tee	NBD101-PUR-L	Explore the cosmos with this vibrant purple tee.	https://m.media-amazon.com/images/I/712Qq0Y58UL._SX569_.jpg	tshirt	399	15	2025-09-22 09:01:45.708	2025-09-23 04:55:55.517	L	#800080
cmfuwdms90047umcgn4ct83cr	Desert Mirage Tee	DSM202-YEL-S	Sunshine yellow tee inspired by desert dunes.	https://m.media-amazon.com/images/I/61hK7NzXx0L._SX569_.jpg	tshirt	365.5	25	2025-09-22 09:01:54.201	2025-09-23 04:56:30.376	S	#FFD700
cmfuwdstq0048umcg3egj2d4q	Desert Mirage Tee	DSM202-YEL-M	Sunshine yellow tee inspired by desert dunes.	https://m.media-amazon.com/images/I/61hK7NzXx0L._SX569_.jpg	tshirt	389.99	20	2025-09-22 09:02:02.03	2025-09-23 04:56:30.376	M	#FFD700
cmfuwe0sq0049umcg9nql3ahq	Storm Breaker Tee	STB303-BLK-S	Bold black tee designed for the urban warrior.	https://m.media-amazon.com/images/I/61-Hg4wfqpL._SX569_.jpg	tshirt	420	18	2025-09-22 09:02:12.361	2025-09-23 04:57:18.648	S	#000000
cmfuwe7dp004aumcgdg2kevha	Storm Breaker Tee	STB303-BLK-M	Bold black tee designed for the urban warrior.	https://m.media-amazon.com/images/I/61-Hg4wfqpL._SX569_.jpg	tshirt	440	16	2025-09-22 09:02:20.893	2025-09-23 04:57:18.648	M	#000000
cmfuweg1v004bumcgojlz3cll	Storm Breaker Tee	STB303-BLK-M	Bold black tee designed for the urban warrior.	https://m.media-amazon.com/images/I/61-Hg4wfqpL._SX569_.jpg	tshirt	440	16	2025-09-22 09:02:32.13	2025-09-23 04:57:18.648	M	#000000
cmfuwenss004cumcgtvfd97yg	Ocean Whisper Tee	OCW404-BLU-XL	A calming blue tee perfect for relaxed vibes.	https://m.media-amazon.com/images/I/71ahDHbcuLL._SX569_.jpg	tshirt	395	12	2025-09-22 09:02:42.172	2025-09-23 04:57:56.033	XL	#1E90FF
cmfuv9wur000kumcg00un7r0k	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	449.99	25	2025-09-22 08:31:01.011	2025-09-22 11:51:46.332	L	#0000FF
cmfuv9ozj000jumcg3b5ubv1b	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	399.99	25	2025-09-22 08:30:50.814	2025-09-22 11:51:46.332	M	#0000FF
cmfuv9glx000iumcgb9drn6fo	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	349.99	25	2025-09-22 08:30:39.957	2025-09-22 11:51:46.332	S	#0000FF
cmfuv8qff000fumcgp4jw4emi	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	499.99	25	2025-09-22 08:30:06.026	2025-09-22 11:51:46.332	XL	#FF0000
cmfuv74v1000eumcgp7765tmm	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	449.99	25	2025-09-22 08:28:51.421	2025-09-22 11:51:46.332	L	#FF0000
cmfuvjgc90019umcgguwkg0j9	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	549.99	9	2025-09-22 08:38:26.169	2025-09-22 12:07:03.974	3XL	#FF0000
cmfuvjpqa001aumcg5wszgk70	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	549.99	10	2025-09-22 08:38:38.337	2025-09-22 12:07:03.974	3XL	#008000
cmfuvjwq9001bumcgubwsvzeg	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	429.99	15	2025-09-22 08:38:47.409	2025-09-22 12:07:03.974	L	#FFFFFF
cmfuvk364001cumcgupq36557	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	459.99	13	2025-09-22 08:38:55.756	2025-09-22 12:07:03.974	XL	#0000FF
cmfuvkafd001dumcg8kwevbmx	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	429.99	15	2025-09-22 08:39:05.161	2025-09-22 12:07:03.974	L	#000000
cmfuvkgyp001eumcg3jh4pwfa	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	429.99	15	2025-09-22 08:39:13.632	2025-09-22 12:07:03.974	L	#008000
cmfuvkuir001fumcgirpnxy9b	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	509.99	10	2025-09-22 08:39:31.203	2025-09-22 12:07:03.974	2XL	#FF0000
cmfuvl7vo001humcgicmm73rv	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	359.99	20	2025-09-22 08:39:48.516	2025-09-22 12:07:03.974	S	#000000
cmfuvl1pi001gumcg8tz4t6gy	Premium Comfort T-Shirt	TSHIRT2001	Ultra-soft premium t-shirt made with sustainable cotton.	https://m.media-amazon.com/images/I/31Pz1K2IHZL.jpg	tshirt	389.99	18	2025-09-22 08:39:40.519	2025-09-22 12:07:03.974	M	#008000
cmfuv918p000gumcg8mtj3j14	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81uqfvaUawL._SY741_.jpg	tshirt	749.99	25	2025-09-22 08:30:20.042	2025-09-28 16:13:32.751	2XL	#FF0000
cmfuv990f000humcg275lr21o	Classic Cotton T-Shirt	TSHIRT1001	Soft and breathable cotton t-shirt perfect for everyday wear.	https://m.media-amazon.com/images/I/81CdwP1VV6L._SX679_.jpg	tshirt	3	24	2025-09-22 08:30:30.11	2025-10-04 10:21:07.462	3XL	#FF0000
cmfuvrsma0028umcg80pbm7wl	Everyday Essential Tee	TEE401-WHT-L	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	429.99	14	2025-09-22 08:44:55.329	2025-09-22 12:15:24.249	L	#FFFFFF
cmfuvs69t002aumcgmv39s859	Everyday Essential Tee	TEE401-WHT-2XL	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	499.99	11	2025-09-22 08:45:13.023	2025-09-22 12:15:24.249	2XL	#FFFFFF
cmfuvrz520029umcgtdyjg4kl	Everyday Essential Tee	TEE401-WHT-XL	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	459.99	12	2025-09-22 08:45:03.783	2025-09-22 12:15:24.249	XL	#FFFFFF
cmfuvsep7002bumcgffdqrjmz	Everyday Essential Tee	TEE401-BLK-S	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	369.99	20	2025-09-22 08:45:23.948	2025-09-22 12:15:24.249	S	#000000
cmfuvslxg002cumcg13m9piyf	Everyday Essential Tee	TEE401-BLK-M	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	399.99	19	2025-09-22 08:45:33.315	2025-09-22 12:15:24.249	M	#000000
cmfuvsrs1002dumcggpavxqgi	Everyday Essential Tee	TEE401-BLK-L	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	429.99	17	2025-09-22 08:45:40.897	2025-09-22 12:15:24.249	L	#000000
cmfuvszw5002eumcg07432v3w	Everyday Essential Tee	TEE401-BLK-XL	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	459.99	13	2025-09-22 08:45:51.412	2025-09-22 12:15:24.249	XL	#000000
cmfuvt90o002fumcgm3v81pfa	Everyday Essential Tee	TEE401-BLK-2XL	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	499.99	12	2025-09-22 08:46:03.241	2025-09-22 12:15:24.249	2XL	#000000
cmfuvtgax002gumcgi7wear4q	Everyday Essential Tee	TEE401-RED-M	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	399.99	20	2025-09-22 08:46:12.661	2025-09-22 12:15:24.249	M	#FF0000
cmfuvtnbq002humcgy9hm54zh	Everyday Essential Tee	TEE401-RED-L	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	429.99	18	2025-09-22 08:46:21.782	2025-09-22 12:15:24.249	L	#FF0000
cmfuvtue2002iumcgho2nfr8x	Everyday Essential Tee	TEE401-RED-XL	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	459.99	14	2025-09-22 08:46:30.937	2025-09-22 12:15:24.249	XL	#FF0000
cmfuvua9a002jumcgtz6kikf0	Everyday Essential Tee	TEE401-BLU-S	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	369.99	21	2025-09-22 08:46:51.502	2025-09-22 12:15:24.249	S	#0000FF
cmfuvuhbh002kumcgk48cghgw	Everyday Essential Tee	TEE401-BLU-M	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	399.99	19	2025-09-22 08:47:00.654	2025-09-22 12:15:24.249	M	#0000FF
cmfuvup7p002lumcgc9xs0942	Everyday Essential Tee	TEE401-BLU-L	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	429.99	16	2025-09-22 08:47:10.884	2025-09-22 12:15:24.249	L	#0000FF
cmfuvuvrw002mumcgvnurf3q5	Everyday Essential Tee	TEE401-GRN-S	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	369.99	22	2025-09-22 08:47:19.389	2025-09-22 12:15:24.249	S	#008000
cmfuvw3fl002sumcgx69fokgw	Everyday Essential Tee	TEE401-BLU-XL	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	459.99	14	2025-09-22 08:48:15.969	2025-09-22 12:15:24.249	XL	#0000FF
cmfuvvy6e002rumcglxm6wq8t	Everyday Essential Tee	TEE401-RED-2XL	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	489.99	12	2025-09-22 08:48:09.157	2025-09-22 12:15:24.249	2XL	#FF0000
cmfuvvs1h002qumcgviry4w39	Everyday Essential Tee	TEE401-GRN-2XL	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	499.99	10	2025-09-22 08:48:01.205	2025-09-22 12:15:24.249	2XL	#008000
cmfuvvho8002pumcgj8rrpsko	Everyday Essential Tee	TEE401-GRN-XL	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	459.99	13	2025-09-22 08:47:47.767	2025-09-22 12:15:24.249	XL	#008000
cmfuvvb1n002oumcgk7ufek24	Everyday Essential Tee	TEE401-GRN-L	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	429.99	16	2025-09-22 08:47:39.179	2025-09-22 12:15:24.249	L	#008000
cmfuvv2rj002numcg59mbtjs2	Everyday Essential Tee	TEE401-GRN-M	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/71CmSA6nW4L._SY741_.jpg	tshirt	399.99	18	2025-09-22 08:47:28.446	2025-09-22 12:15:24.249	M	#008000
cmfuvlgt6001iumcgj3saiqr6	Urban Fit Tee	TSHIRT3001-WHT-S	A stylish and breathable t-shirt perfect for urban living.	https://m.media-amazon.com/images/I/61O0UteU7LL._SY741_.jpg	tshirt	359.99	22	2025-09-22 08:40:00.09	2025-09-22 12:17:16.825	S	#FFFFFF
cmfuvw9qj002tumcg4zp5lppr	Everyday Essential Tee	TEE401-BLU-2XL	Everyday comfort meets premium cotton. Soft, simple, essential.	https://m.media-amazon.com/images/I/51f5hkE87aL._SY741_.jpg	tshirt	499.99	11	2025-09-22 08:48:24.139	2025-09-22 12:25:24.204	2XL	#0000FF
cmfuwf2pu004dumcgqweveoee	Forest Pulse Tee	FRP505-GRN-M	Fresh green tee inspired by forest life.	https://m.media-amazon.com/images/I/71IG7-Xr18L._SX569_.jpg	tshirt	385.75	19	2025-09-22 09:03:01.506	2025-09-23 04:58:44.016	M	#228B22
cmfuwf9qd004eumcgmff4zkjd	Forest Pulse Tee	FRP505-GRN-L	Fresh green tee inspired by forest life.	https://m.media-amazon.com/images/I/71IG7-Xr18L._SX569_.jpg	tshirt	410	17	2025-09-22 09:03:10.597	2025-09-23 04:58:44.016	L	#228B22
cmfuwfh9w004fumcgf5w4zbrw	Crimson Wave Tee	CRW606-RED-S	Vivid red tee with a bold wave print.	https://m.media-amazon.com/images/I/51eyP4V2LUL._SY741_.jpg	tshirt	395.5	22	2025-09-22 09:03:20.372	2025-09-23 04:59:59.028	S	#B22222
cmfuwfpan004gumcgf55wirqs	Crimson Wave Tee	CRW606-RED-M	Vivid red tee with a bold wave print.	https://m.media-amazon.com/images/I/51eyP4V2LUL._SY741_.jpg	tshirt	410	18	2025-09-22 09:03:30.767	2025-09-23 04:59:59.028	M	#B22222
cmfxqjtct000kum28y3nosrsp	Aurora Night Mug	ANM500-NV	Deep navy mug inspired by the aurora night sky.	https://m.media-amazon.com/images/I/41Zwx043rvL._SX300_SY300_QL70_FMwebp_.jpg	mugs	470	30	2025-09-24 08:42:03.485	2025-09-24 09:09:48.928	350ml	#191970
cmfxqk0bc000lum28yha8kjqh	Forest Haze Mug	FHM820-GRN	Earthy green mug with subtle forest-inspired patterns.	https://m.media-amazon.com/images/I/310dcoChJTL._SX300_SY300_QL70_FMwebp_.jpg	mugs	440	38	2025-09-24 08:42:12.504	2025-09-24 09:11:16.516	350ml	#228B22
cmfxqk6ps000mum28pwdcjthv	Crimson Ember Mug	CEM640-RED	Bold red mug with ember-like gradients for a striking look.	https://m.media-amazon.com/images/I/414rj4KR0YL._SX300_SY300_QL70_FMwebp_.jpg	mugs	450	36	2025-09-24 08:42:20.799	2025-09-24 09:11:16.516	350ml	#DC143C
cmfxqllkf000oum28m6yltfn6	Starlit Night Mug	SNM910-NV	Deep navy mug inspired by twinkling starlit skies.	https://m.media-amazon.com/images/I/31XTpfzSVQL._SX300_SY300_QL70_FMwebp_.jpg	mugs	480	28	2025-09-24 08:43:26.702	2025-09-24 09:16:31.424	350ml	#191970
cmfxqlv8m000pum28t6vocgtb	Aurora Glow Mug	AGM730-PUR	Vibrant purple mug inspired by northern lights auroras.	https://m.media-amazon.com/images/I/31LXIc7+LNL._SY300_SX300_QL70_FMwebp_.jpg	mugs	490	25	2025-09-24 08:43:39.238	2025-09-24 09:18:46.572	350ml	#800080
cmfxqm3ji000qum285liu988c	Golden Dusk Mug	GDM830-YLW	Golden yellow mug reflecting the calm of dusk.	https://m.media-amazon.com/images/I/318xpI+rEEL._SY300_SX300_QL70_FMwebp_.jpg	mugs	495	30	2025-09-24 08:43:49.998	2025-09-24 09:18:46.572	350ml	#FFD700
cmfxqmcqu000rum28te3tv3ob	Crimson Blaze Mug	CBM640-RED	Bold red mug with fiery gradient patterns for a striking look.	https://m.media-amazon.com/images/I/31dj9c9WetL._SX300_SY300_QL70_FMwebp_.jpg	mugs	470	32	2025-09-24 08:44:01.926	2025-09-24 09:18:46.572	350ml	#DC143C
cmfxqmk5g000sum28fm2bji3p	Ocean Breeze Mug	OBM720-BLU	Turquoise mug inspired by serene ocean breeze patterns.	https://m.media-amazon.com/images/I/31kNl2OSoIS._SX300_SY300_QL70_FMwebp_.jpg	mugs	460	29	2025-09-24 08:44:11.523	2025-09-24 09:20:05.073	350ml	#1E90FF
\.


--
-- Data for Name: ProductOrder; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."ProductOrder" (id, "orderId", "productId", quantity, color, price, size) FROM stdin;
cmg9td0pn0003ummohxysp6z3	cmg9td0pb0001ummow2tvxft4	cmfuvni1x001sumcg35ijyyb7	1	#FF0000	559.99	3XL
cmg9tfjvt0007ummo2sgxan9h	cmg9tfjvt0005ummoi75mgi93	cmfuvni1x001sumcg35ijyyb7	3	#FF0000	559.99	3XL
cmg9tft9d000bummod2eipoif	cmg9tft9d0009ummo6qbrqux1	cmfuvni1x001sumcg35ijyyb7	3	#FF0000	559.99	3XL
cmg9tg0ri000fummohj2nljkd	cmg9tg0rh000dummovpbp2vdq	cmfuvni1x001sumcg35ijyyb7	1	#FF0000	559.99	3XL
cmgaji57z0003um6s6zbw9d4e	cmgaji57w0001um6si2ukk6js	cmfuvni1x001sumcg35ijyyb7	1	#FF0000	559.99	3XL
cmgaji57z0004um6s6ur91kdr	cmgaji57w0001um6si2ukk6js	cmfuwg2ld004humcg6t9avbon	1	#708090	375	M
cmgaji5890005um6sav3r1qim	cmgaji57w0001um6si2ukk6js	cmfuvyubf002yumcgss5pfijx	1	#FFFFFF	499.99	2XL
cmgaji5890006um6sads06h9b	cmgaji57w0001um6si2ukk6js	cmfuw023w0035umcgsov8b4cb	1	#FF0000	459.99	XL
cmgao50dl000aum6s68aitu8z	cmgao50dl0008um6s5brrcmqn	cmfuvni1x001sumcg35ijyyb7	5	#FF0000	559.99	3XL
cmgao50dl000bum6sq6md7gle	cmgao50dl0008um6s5brrcmqn	cmfuwg2ld004humcg6t9avbon	2	#708090	375	M
cmgao50dl000cum6s1hp7jn8t	cmgao50dl0008um6s5brrcmqn	cmfuvyubf002yumcgss5pfijx	6	#FFFFFF	499.99	2XL
cmgao50dl000dum6sv4ixu4zq	cmgao50dl0008um6s5brrcmqn	cmfuw023w0035umcgsov8b4cb	3	#FF0000	459.99	XL
cmgav9iru000hum6sigikkuhn	cmgav9irf000fum6slkybxr01	cmfuv3mof0005umcg7gvzsjyr	1	#FFFFFF	1	3XL
cmgav9iru000ium6sketazdts	cmgav9irf000fum6slkybxr01	cmfuv6d7d000bumcgyhg4xq5i	1	#000000	2	3XL
cmgav9iru000jum6scsijdy76	cmgav9irf000fum6slkybxr01	cmfuvakqk000numcgsvwhpwu7	1	#0000FF	4	3XL
cmgav9iru000kum6s19kh1p07	cmgav9irf000fum6slkybxr01	cmfuvc5fd000tumcgspz1khwm	1	#008000	5	3XL
cmgav9iru000lum6s6rk8wf0g	cmgav9irf000fum6slkybxr01	cmfuv990f000humcg275lr21o	1	#FF0000	3	3XL
cmgavrgr1000pum6s9t51bp68	cmgavrgr1000num6shfvh5ddf	cmfuv990f000humcg275lr21o	1	#FF0000	3	3XL
cmgc1ftwq0003um0ckvkhipp3	cmgc1ftwq0001um0chifdqw8s	cmfuv990f000humcg275lr21o	1	#FF0000	3	3XL
cmgc392x20007um0cvgtzrxh6	cmgc392x20005um0c79u6457y	cmfuv3mof0005umcg7gvzsjyr	1	#FFFFFF	1	3XL
cmgc39hea000bum0c052ie1k5	cmgc39hea0009um0cqns2m9g0	cmfuv3mof0005umcg7gvzsjyr	1	#FFFFFF	1	3XL
cmgc3a2mf000fum0chm0d8ixu	cmgc3a2mf000dum0cw75erf9n	cmfuv3mof0005umcg7gvzsjyr	1	#FFFFFF	1	3XL
cmgc3b184000jum0cn0jjmz2k	cmgc3b184000hum0c3aybwpyc	cmfuv3mof0005umcg7gvzsjyr	1	#FFFFFF	1	3XL
cmgc3cdgm000num0cs8fwc70w	cmgc3cdgm000lum0c4klk35jc	cmfuv3mof0005umcg7gvzsjyr	1	#FFFFFF	1	3XL
cmgc3k3qv000rum0chv7sytq3	cmgc3k3qv000pum0ckrq6xj30	cmfxqendq000aum28srq1lvcq	1	#228B22	1180	L
cmgc3pqiq000vum0cxjqn3r4g	cmgc3pqip000tum0c8e25gav4	cmfxqendq000aum28srq1lvcq	1	#228B22	1180	L
cmgc3pqiq000wum0c38wdv23b	cmgc3pqip000tum0c8e25gav4	cmfxqeuqc000bum28tmo2f3su	4	#228B22	1200	2XL
cmgclgbur0003ummckeyrmavo	cmgclgbuo0001ummco8n0bg0q	cmfuvyubf002yumcgss5pfijx	1	#FFFFFF	499.99	2XL
cmgdb6jyg0003umxc9ilua4sx	cmgdb6jyg0001umxc9k2bt2mp	cmfuvyubf002yumcgss5pfijx	1	#FFFFFF	499.99	2XL
cmgdb6jyg0004umxcrzhmsx8r	cmgdb6jyg0001umxc9k2bt2mp	cmfuvni1x001sumcg35ijyyb7	1	#FF0000	559.99	3XL
cmgdb9w6e0008umxci0i04g06	cmgdb9w6e0006umxcjullswjd	cmfuvyubf002yumcgss5pfijx	1	#FFFFFF	499.99	2XL
cmgdb9w6e0009umxctwnujjhg	cmgdb9w6e0006umxcjullswjd	cmfuvni1x001sumcg35ijyyb7	1	#FF0000	559.99	3XL
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."User" (id, name, email, password, "createdAt", "updatedAt", mobile, city, state, address) FROM stdin;
cmfy0a7660001um5gr7bydvoo	admin	admin@gmail.com	$2b$10$2VmwMkTqmchEjGOUtPQCTOR4xnU72tfFTqkZFj1kJkVXdXgi.IATi	2025-09-24 13:14:30.942	2025-10-05 08:34:39.461	0123456789	Pune	Maharashtra	Main City area 
cmfyvzxqj0000umjgi9r9ct9g	tester	test@gmail.com	$2b$10$FLG8YvgmXoJJXYzPZ5QHCOyzRswVg64uYhuLnzdqwT2gApha6R2HW	2025-09-25 04:02:19.915	2025-10-05 12:40:43.898	0123456789	Chandrapur	Maharashtra	Main Center City Area Jumde Layout
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
784792a3-e8fb-492a-89c5-702b608e5b66	ea8bea94098b989631ac38102c875c6ac1db5f27484cd4aafe70c535da65526e	2025-09-15 09:03:31.538045+00	20250915090330_table_creation	\N	\N	2025-09-15 09:03:31.417537+00	1
f3f7e220-b545-486b-9173-02fa6dea2861	271d91b9df942b604e32c0bebe743d6341c129a6e9ebaee094aeec3b1d0f686e	2025-09-16 07:41:54.194416+00	20250916074154_product_table_sizeandcolor_array_changed	\N	\N	2025-09-16 07:41:54.074439+00	1
d87bd94d-2f29-4265-a379-58d8c7f3d693	a6d74f2be4f93d876d2fe4eca2d135d1bc24b9c73d6e5cdaed3c53e86e5dc2ab	2025-09-17 08:54:58.579713+00	20250917085458_product_table_sizeandcolor_updated_to_array_to_string	\N	\N	2025-09-17 08:54:58.561407+00	1
80eeff11-44c8-46d3-b0be-3d59ffc09544	a799cfa11255019fae3e1d279f41075462f72775d138735a6e5e17e974ee58d1	2025-09-18 06:47:02.600558+00	20250918064702_product_table_product_column_remove_unique	\N	\N	2025-09-18 06:47:02.588166+00	1
c63bfd01-8f69-45d3-95c1-13f8d4a86f09	5a60bceeb816169519425945a4909e278f31faa89abfc2230f83abf03b2efc9f	2025-09-24 10:46:39.209899+00	20250924104639_user_table_mobileadded	\N	\N	2025-09-24 10:46:39.201155+00	1
aeb7f334-aad4-44a2-9e31-e0fe3251f44e	57164bdd33cb3ef0809fa7fd46b66167d9107f16538173b03815c60474b5d427	2025-10-02 17:56:44.33479+00	20251002175644_fix_order_relation	\N	\N	2025-10-02 17:56:44.318231+00	1
7b37be62-8ca0-43cd-957a-885ede2ed64d	b637d483b2f1d26359af18156d4e1569577e909f7d7c8fea995b3f27441e6650	2025-10-02 17:59:38.45564+00	20251002175938_fix_order_relation	\N	\N	2025-10-02 17:59:38.446978+00	1
adabb218-7735-4203-ba27-7b3542b17192	38e66a96d51299dc2c9867aae7448246a37a96bcc554625e92a993ccdf9c0bd9	2025-10-02 18:25:38.363261+00	20251002182538_fix_order_relation_1	\N	\N	2025-10-02 18:25:38.354185+00	1
8cbbcc37-e3fb-47ab-acde-cf0474caf5d2	cfdd7038b9bf46cba200710c9d8a1fdc025e9321ebbe1dcb6178c1d4795329be	2025-10-02 19:17:09.191602+00	20251002191709_add_product_order_fields	\N	\N	2025-10-02 19:17:09.181761+00	1
2734d386-5b23-448a-87d0-2d8dccfeba06	757c8d49aa0e468c16b6a54a5e6da1131ef93cd3506714aa5d4361ec10e94eae	2025-10-04 18:21:51.78646+00	20251004182151_add_order_fields_delivery_status_transaction_id	\N	\N	2025-10-04 18:21:51.766527+00	1
c431a5ad-8a02-431d-bd75-523b09a42baf	4726ba0b17dbed2a45d66941f0ce28d809656a60e39addff7076fd36aa36f4a7	2025-10-05 06:42:11.523646+00	20251005064211_add_city_and_state_to_usertable_ordertable	\N	\N	2025-10-05 06:42:11.476743+00	1
3fe9105f-223c-4dcd-aef4-4aa032e83ea2	b2ff7b46fbc26db52d1efc55dd2d81be4cfb8708faf3b87177e6ac27deca94bd	2025-10-05 08:28:21.568057+00	20251005082821_add_address_users_table	\N	\N	2025-10-05 08:28:21.553406+00	1
\.


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: ProductOrder ProductOrder_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ProductOrder"
    ADD CONSTRAINT "ProductOrder_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Order_orderID_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Order_orderID_key" ON public."Order" USING btree ("orderID");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Order Order_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_email_fkey" FOREIGN KEY (email) REFERENCES public."User"(email) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProductOrder ProductOrder_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ProductOrder"
    ADD CONSTRAINT "ProductOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProductOrder ProductOrder_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ProductOrder"
    ADD CONSTRAINT "ProductOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict IXxL9lGJoZebtV41FGh5hDwR9WLFghRfmIDT64cFD7ewvkeUVvyE5HZsovlReDa

