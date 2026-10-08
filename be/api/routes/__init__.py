from fastapi import APIRouter
from . import health, auth, donors, recipients, labs, matches, audit, sim, fhir, overview, policies

router = APIRouter()

router.include_router(health.router, prefix="/health", tags=["health"])
router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(donors.router, tags=["clinical", "donors"])
router.include_router(recipients.router, tags=["clinical", "recipients"])
router.include_router(labs.router, tags=["clinical", "labs"])
router.include_router(matches.router, tags=["matching"])
router.include_router(audit.router, prefix="/audit", tags=["audit"])
router.include_router(sim.router, prefix="/sim", tags=["simulator"])
router.include_router(fhir.router, prefix="/fhir", tags=["fhir"])

router.include_router(overview.router, prefix="/overview", tags=["overview"])
router.include_router(policies.router, prefix="/policies", tags=["policies"])
